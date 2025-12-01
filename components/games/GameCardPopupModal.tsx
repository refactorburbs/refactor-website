"use client";

import { useEffect, useRef, useState } from "react";
import { GameData } from "@/lib/types/games.types";
import Image from "next/image";
import Hls from "hls.js";

import styles from "./gameCardPopupModal.module.css";

interface GameCardPopupModalProps {
  isPopupVisible: boolean;
  game: GameData;
}

export default function GameCardPopupModal({ isPopupVisible, game }: GameCardPopupModalProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null); // second ref to avoid memory leaks; the cleanup of hls.destroy() captures the old hls instance so if the useEffect creates a new hls, old hls instances won't be destroyed.

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !game.trailer || !isPopupVisible) {
      return;
    }

    // Force hls.js library instead of native hls for better error and CORS handling
    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true, // uses a web worker for converting video format to not hold up UI
        xhrSetup: (xhr) => { // cb fn that runs with heach HTTP request that hls.js makes (hls is made of many small, streamed requests)
          xhr.withCredentials = false; // Steam's CDN is a public resource, so don't send auth headers (CORS) - steam cdn doesn't support it
        },
      });
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Fetching manifest .m3u8 file from hls source...");
        if (isPopupVisible && videoRef.current) {
          // The video can only play once the manifest is parsed/loaded (manifest tells what order to play segments in)
          videoRef.current.play().catch(error => {
            // Some errors like NotAllowedError, NotSupportedError, and NetworkError are real problems we need to worry about,
            // but if it's just an AbortError from unmounting or stopping the video, we can ignore it.
            if (error.name !== "AbortError") {
              console.error("Playback failed:", error);
            }
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log("Recovering from network error");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("Recovering from media error");
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal error:", data);
              hls.destroy();
              break;
          }
        }
      });

      hls.loadSource(game.trailer);
      hls.attachMedia(video);

      return () => {
        video.pause();
        video.src = "";

        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }
    // Fallback to native HLS only if hls.js is not supported
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("Using native HLS");
      video.src = game.trailer;
      video.play().catch(error => {
        if (error.name !== "AbortError") {
          console.error("Play failed:", error);
        }
      });

      return () => {
        video.pause();
        video.src = "";
      };
    }
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
          No HTML5 or HLS Video Support
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
            <span>{`${game.reviewSummary?.percentPositive || "0"}%`}</span>
          </div>
          <span className={styles.review_desc}>
            {game.reviewSummary?.reviewScoreDesc}
          </span>
          <span className={styles.total_reviews}>
            {`(${game.reviewSummary?.total || "No reviews"})`}
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