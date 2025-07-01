"use client";

import { useState } from "react";
import { GameData } from "@/lib/types/games.types";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import SteamButton from "./SteamButton";
import GameCardPopupModal from "./GameCardPopupModal";
import Image from "next/image";

import styles from "./gameCard.module.css";

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
      <ScrollAnimatedElement
        directionIn="up"
        directionOut="up"
      >
        <div className={`gradient-container ${styles.game_card}`}>
          <div className={styles.game_card_image_wrapper}>
            <Image
              src={game.headerImage || "/image-not-found.png"}
              alt={`${game.name} Header`}
              width={460}
              height={215}
            />
          </div>
          <div className={styles.game_card_content}>
            <div className={styles.header_description}>
              <h2>{game.name}</h2>
              <p className={styles.short_description}>
                {game.shortDescription}
              </p>
            </div>
            <SteamButton storePage={game.storePage}/>
          </div>
        </div>
      </ScrollAnimatedElement>
      <GameCardPopupModal isPopupVisible={isPopupVisible} game={game}/>
    </div>
  );
}