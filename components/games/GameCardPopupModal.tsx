"use client";

import { useEffect, useRef, useState } from "react";
import { GameData } from "@/lib/types/games.types";
import Image from "next/image";

import styles from "./gameCardPopupModal.module.css";

interface NativeCardPopupModalProps {
  isPopupVisible: boolean;
  game: GameData;
}

export default function NativeCardPopupModal({ isPopupVisible, game }: NativeCardPopupModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !game.trailer || !isPopupVisible) {
      return;
    }

    video.src = game.trailer;
    video.play().catch(error => {
      // Some errors like NotAllowedError, NotSupportedError, and NetworkError are real problems we need to worry about,
      // but if it's just an AbortError from unmounting or stopping the video, we can ignore it.
      if (error.name !== "AbortError") {
        console.error("Playback failed:", error);
      }
    });

    return () => {
      video.pause();
      video.src = "";
    };
  }, [game.trailer, isPopupVisible]);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className={`${styles.popup_modal} ${isPopupVisible ? styles.visible : styles.not_visible}`}>
      <div className={styles.popup_video_wrapper}>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className={styles.popup_video}
        >
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