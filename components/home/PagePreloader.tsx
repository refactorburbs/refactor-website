"use client";

import { ASSETS } from "@/lib/constants/assets.constants";
import { useEffect, useState } from "react";

import styles from "./pagePreloader.module.css";

const video = ASSETS.VIDEOS.preloader;

export default function PagePreloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 2600);

    return () => clearTimeout(loadTimer);
  }, [])

  return (
    <div className={`${styles.loader_wrapper} ${isLoaded ? styles.loaded : ""}`}>
      <video
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