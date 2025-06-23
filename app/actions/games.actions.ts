"use server";

import prisma from "@/lib/prisma";
import { GameFormState } from "@/lib/types/forms.types";
import { fetchSteamGames } from "@/lib/utils/fetch.utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schemas ----------------------------------------------------------------
const createGameSchema = z.object({
  steamId: z.coerce.number().int().positive("Steam ID must be a positive number"),
  name: z.string().min(1, "Game name is required").max(200, "Name too long"),
  storePage: z.string().url("Must be a valid URL"),
});

const editGameSchema = z.object({
  name: z.string().min(1, "Game name is required").max(200, "Name too long"),
  storePage: z.string().url("Must be a valid URL")
})
// -----------------------------------------------------------------------------------

export async function fetchAllGameCards() {
  // If we ever have more than just Steam games, we can modify this function
  // to fetch from multiple sources and return a different response array.
  const steamGames = await fetchSteamGames();
  return steamGames;
}

// Get a single game (for editing)
export async function getGameById(id: number) {
  try {
    const game = await prisma.steamGame.findUnique({
      where: { steamId: id }
    });
    return game;
  } catch (error) {
    console.error("❌ Get game error:", error);
    return null;
  }
}

export async function createGame(state: GameFormState, formData: FormData): Promise<GameFormState> {
  const validatedFields = createGameSchema.safeParse({
    steamId: formData.get("steamId"),
    name: formData.get("name"),
    storePage: formData.get("storePage"),
  });

  if (!validatedFields.success) {
    console.log("❌ Create game: Validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { steamId, name, storePage } = validatedFields.data;

  try {
    const existingGame = await prisma.steamGame.findUnique({
      where: { steamId }
    })

    if (existingGame) {
      return {
        errors: {
          steamId: ["A game with this Steam ID already exists"]
        }
      }
    }

    await prisma.steamGame.create({
      data: {
        steamId,
        name,
        storePage,
      }
    })

    console.log("✅ Create game: Success");

    // Revalidate the games page to show new data
    revalidatePath("/admin/games");

  } catch (error) {
    console.error("❌ Create game error:", error);
    return {
      message: "Something went wrong. Please try again."
    }
  }

  redirect("/admin/games");
}

export async function updateGame(
  gameId: number,
  state: GameFormState,
  formData: FormData
): Promise<GameFormState> {
  // Validate form fields
  const validatedFields = editGameSchema.safeParse({
    name: formData.get("name"),
    storePage: formData.get("storePage"),
  })

  if (!validatedFields.success) {
    console.log("❌ Update game: Validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, storePage } = validatedFields.data;

  try {
    await prisma.steamGame.update({
      where: { steamId: gameId },
      data: {
        name,
        storePage,
      }
    })

    console.log("✅ Update game: Success");
    revalidatePath("/admin/games");

  } catch (error) {
    console.error("❌ Update game error:", error);
    return {
      message: "Something went wrong when updating. Please try again."
    }
  }

  redirect("/admin/games");
}

export async function deleteGame(gameId: number) {
  try {
    await prisma.steamGame.delete({
      where: { steamId: gameId }
    })

    console.log("✅ Delete game: Success");
    revalidatePath("/admin/games");

  } catch (error) {
    console.error("❌ Delete game error:", error);
    throw new Error("Failed to delete game");
  }
}