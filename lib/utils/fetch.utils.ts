import {
  STEAM_DETAILS_BASE_URL,
  STEAM_REVIEWS_BASE_URL
} from "../constants/api.constants";
import prisma from "../prisma";
import {
  SteamGameData,
  SteamGameResponseData,
  SteamGameReviewSummary
} from "../types/games.types";
import { forceHttps, scrubHTMLEncodedString } from "./general.utils";

/**
 * Fetches a list of games from the local database and enriches each with details from the Steam API.
 *
 * - Queries local game data from Prisma.
 * - Makes a request to the Steam Storefront API for additional metadata.
 * - Also fetches user review summaries for each game.
 * - Replaces HTTP with HTTPS for media URLs to prevent mixed content issues.
 * - Scrubs HTML from long descriptions for clean text rendering.
 * - Applies caching via `next.revalidate` (1 hour).
 *
 * If the Steam API call fails for a particular game, the original local game data is returned for that entry.
 *
 * @returns A promise that resolves to an array of `SteamGameData`, including enriched metadata and review summaries.
 */
export async function fetchSteamGames(): Promise<SteamGameData[]> {
  const steamGamesData = await prisma.steamGame.findMany();

  const results: SteamGameData[] = await Promise.all(
    steamGamesData.map(async (game) => {
      try {
        const response = await fetch(`${STEAM_DETAILS_BASE_URL}${game.steamId}`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SteamGameResponseData = await response.json();
        const reviewSummary = await fetchSteamReviewsForGame(game.steamId);

        return {
          id: game.steamId,
          name: game.name,
          trailer: forceHttps(data[game.steamId].data.movies[0].mp4.max),
          storePage: game.storePage,
          headerImage: data[game.steamId].data.header_image,
          tags: data[game.steamId].data.genres?.map((genre) => genre.description) || [],
          shortDescription: data[game.steamId].data.short_description,
          longDescription: scrubHTMLEncodedString(data[game.steamId].data.detailed_description),
          reviewSummary,
        };
      } catch (error) {
        console.error(`Failed to fetch data for ${game.name}:`, error);
        return game;
      }
    })
  )
  return results;
}

/**
 * Fetches and calculates a summary of user reviews for a given game from the Steam API.
 *
 * Extracts total positive reviews, total reviews, percentage of positive reviews,
 * and a human-readable review score description.
 *
 * If the API call fails, returns a fallback summary with zeroed values and "No Reviews".
 *
 * @param gameId - The numeric Steam ID of the game to fetch reviews for.
 * @returns A promise that resolves to a `SteamGameReviewSummary` object containing review statistics.
 */
async function fetchSteamReviewsForGame(gameId: number): Promise<SteamGameReviewSummary> {
  try {
    const response = await fetch(`${STEAM_REVIEWS_BASE_URL}${gameId}?json=1`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const { total_positive, total_reviews, review_score_desc } = data.query_summary;

    return {
      totalPositive: total_positive,
      total: total_reviews,
      percentPositive: Number(((total_positive / total_reviews) * 100).toFixed()),
      reviewScoreDesc: review_score_desc,
    };
  } catch (error) {
    console.error(`Error fetching reviews for game ${gameId}:`, error);
    return {
      totalPositive: 0,
      total: 0,
      percentPositive: 0,
      reviewScoreDesc: "No Reviews",
    };
  }
}