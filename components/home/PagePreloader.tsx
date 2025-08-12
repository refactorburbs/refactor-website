"use client";

import { ASSETS } from "@/lib/constants/assets.constants";
import { useEffect, useRef, useState } from "react";

import styles from "./pagePreloader.module.css";

const video = ASSETS.VIDEOS.preloader;

export default function PagePreloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preloaderVideoElement = videoRef.current;
    if (!preloaderVideoElement) return;

    const handleVideoEnd = () => {
      // After video ends, isLoaded is used to change the class on
      // the preloader component to slide it up and out of view.
      setIsLoaded(true);
    };

    if (preloaderVideoElement.ended) {
      console.log("Video was too short! Preloader video already ended");
      handleVideoEnd();
    } else {
      preloaderVideoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (preloaderVideoElement) {
        preloaderVideoElement.removeEventListener("ended", handleVideoEnd);
      }
    }
  }, []);

  return (
    <div className={`${styles.loader_wrapper} ${isLoaded ? styles.loaded : ""}`}>
      <video
        ref={videoRef}
        className={styles.video_background}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={video} type="video/webm" />
        <p>No HTML5 video support</p>
      </video>
      <div className={styles.progress} />
    </div>
  );
}