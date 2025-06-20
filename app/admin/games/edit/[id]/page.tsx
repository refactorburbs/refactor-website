import { getGameById, updateGame } from "@/app/actions";
import { notFound } from "next/navigation";
import GameForm from "../../GameForm";
import { getUser } from "@/lib/dal";

interface EditGamePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditGamePage({ params }: EditGamePageProps) {
  await getUser();
  const { id } = await params;
  const gameId = Number(id);

  if (isNaN(gameId)) {
    console.log("Game id cannot be coerced to a number");
    notFound();
  }

  const game = await getGameById(gameId);

  if (!game) {
    console.log("Game not found in database");
    notFound();
  }

  // Bind the gameId to the updateGame action.
  // Server actions can only receive two parameters: state and formData
  // but our updateGame fn needs three: id, state, formdata
  // we need the game id to know which to update, and there's no way to pass in
  // the form directly.
  // .bind(null, gameId) creates a new function that:
  // 1. Always passes the id as the first argument (we don't care about "this")
  // 2. Then passes whatever arguments you give it
  // Now when the form calls updateGameWithId(state, formData)
  // It actually calls updateGame(123, state, formData)
  const updateGameWithId = updateGame.bind(null, gameId);

  return (
    <GameForm
      mode="edit"
      game={game}
      action={updateGameWithId}
    />
  );
}