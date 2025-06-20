"use client";

import { useRef, useState } from "react";
import { IGameData } from "@/lib/types/games.types";
import Image from "next/image";

import styles from "./gameCardPopupModal.module.css";

interface GameCardPopupModalProps {
  isPopupVisible: boolean;
  game: IGameData;
}
// @TODO replace in db the trailer video for a webm, cloudinary hosted url
export default function GameCardPopupModal({ isPopupVisible, game }: GameCardPopupModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }

  return (
    <div className={`${styles.popup_modal} ${isPopupVisible ? styles.visible : styles.not_visible}`}>
      <div className={styles.popup_video_wrapper}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.popup_video}
        >
          <source src={game.trailer} type="video/mp4" />
          No HTML5 Video Support
        </video>
        <Image
          src={isMuted ? "/sound-off.svg" : "/sound-on.svg"}
          alt="Toggle Sound"
          width={40}
          height={40}
          className={styles.sound_icon}
          onClick={toggleSound}
        />
      </div>
      <div className={styles.popup_content}>
        <div className={styles.ratings_wrapper}>
          <div className={styles.steam_percent}>
            <span>{`${game.reviewSummary?.percentPositive}%`}</span>
          </div>
          <span className={styles.review_desc}>
            {game.reviewSummary?.reviewScoreDesc}
          </span>
          <span className={styles.total_reviews}>
            {`(${game.reviewSummary?.total})`}
          </span>
        </div>
        <div className={styles.tags_wrapper}>
          {game.tags?.map((tag: string) => (
            <span className={styles.game_tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}