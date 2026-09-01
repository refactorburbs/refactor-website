"use client";

import { useState } from "react";
import { GAME_CARD_SOURCE, GameData } from "@/lib/types/games.types";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import SteamButton from "./SteamButton";
import SteamCardPopupModal from "./SteamCardPopupModal";
import Image from "next/image";

import styles from "./gameCard.module.css";
import GameCardPopupModal from "./GameCardPopupModal";

const FIFA_GAME_ID = 561182;

export default function GameCard({ game }: { game: GameData }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopupVisible(false);
  };

  // @TODO update fallback header image to a real one
  // Today I learned: when you have transform: translate elements, no matter
  // if something is absolutely positioned, if it's a child of that transforming
  // element it will be clipped. No amount of overflow: visible will fix, so I moved
  // the modal popup outside the ScrollAnimatedElement, inside a relative div.
  return (
    <div
      style={{position: "relative"}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ScrollAnimatedElement directionIn="up" directionOut="up">
        <div className={`gradient-container ${styles.game_card}`}>
          <div className={styles.game_card_image_wrapper}>
            {/* Special case for FIFA Game with bleeding/expanded header image */}
            {game.id === FIFA_GAME_ID ?
              <Image
                src={game.headerImage || "/image-not-found.png"}
                alt={`${game.name} Header`}
                width={1215}
                height={788}
                className={styles.fifa_game_header_image}
              />
              :
              <Image
                src={game.headerImage || "/image-not-found.png"}
                alt={`${game.name} Header`}
                width={460}
                height={215}
              />
            }
          </div>
          <div className={styles.game_card_content}>
            <div className={styles.header_description}>
              <h2>{game.name}</h2>
              <p className={styles.short_description}>
                {game.shortDescription}
              </p>
            </div>
            {game.source === GAME_CARD_SOURCE.STEAM && (
              <SteamButton storePage={game.storePage}/>
            )}
          </div>
        </div>
      </ScrollAnimatedElement>
      {game.source === GAME_CARD_SOURCE.STEAM && <SteamCardPopupModal isPopupVisible={isPopupVisible} game={game}/>}
      {game.source === GAME_CARD_SOURCE.GENERIC && <GameCardPopupModal isPopupVisible={isPopupVisible} game={game}/>}
    </div>
  );
}