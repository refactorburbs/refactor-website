import {
  STEAM_DETAILS_BASE_URL,
  STEAM_REVIEWS_BASE_URL
} from "../constants/games.constants";
import prisma from "../prisma";
import {
  ISteamGameData,
  ISteamGameResponseData,
  ISteamGameReviewSummary
} from "../types/games.types";

function forceHttps(url: string): string {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

async function fetchSteamGames(): Promise<ISteamGameData[]> {
  const steamGamesData = await prisma.steamGame.findMany();

  const results: ISteamGameData[] = await Promise.all(
    steamGamesData.map(async (game) => {
      try {
        const response = await fetch(`${STEAM_DETAILS_BASE_URL}${game.steamId}`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ISteamGameResponseData = await response.json();
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

async function fetchSteamReviewsForGame(gameId: number): Promise<ISteamGameReviewSummary> {
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

function scrubHTMLEncodedString(string: string): string {
  const parsed = JSON.parse(JSON.stringify(string));
  const decoded = parsed.replace(/<[^>]*>/g, ''); // remove HTML tags
  // Decode common HTML entities that should be symbols in the string
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  const decodedEntities = decoded.replace(/&[a-zA-Z#0-9]+;/g, (entity: string) => entityMap[entity] || entity);
  return decodedEntities
    .replace(/([.:!?])(?=\S)(?!\s|[A-Z]\.)/g, '$1 ') // Ensure space after ., :, !, or ? unless it's an abbreviation like U.S.A.
    .trim();
}

export {
  fetchSteamGames,
}