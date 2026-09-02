import { GAME_CARD_SOURCE, GameCardData } from "../types/games.types";
import { ASSETS } from "./assets.constants";

export const GENERIC_GAME_CARDS: GameCardData[] = [
  {
    source: GAME_CARD_SOURCE.GENERIC,
    id: 561182, // Just a random unique number here
    name: "FIFA World Cup: Launch Edition",
    trailer: ASSETS.VIDEOS.fifaTrailer,
    storePage: "https://www.netflix.com/games",
    headerImage: ASSETS.IMAGES.GAMES.FIFA.headerImage,
    tags: [
      "Sports Games",
      "Cloud Gaming",
      "Party/Casual",
      "Single Player",
      "Local Multiplayer"
    ],
    shortDescription: "Experience the rush of FIFA World Cup 2026 soccer matches with this fast-paced game for up to four players. Play instantly on your TV or computer."
  }
]