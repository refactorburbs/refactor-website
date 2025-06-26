"use client";

import { ASSETS } from "@/lib/constants/assets.constants";
import { useEffect, useRef, useState } from "react";

import styles from "./pagePreloader.module.css";

const video = ASSETS.VIDEOS.preloader;

export default function PagePreloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  if (!videoLoaded && videoRef.current && videoRef.current.readyState >= 3) {
    setVideoLoaded(true);
    videoRef.current.play().catch((error) => {
      console.error("Error attempting to play", error);
    });
  }
}, [videoLoaded]);

useEffect(() => {
  if (!videoLoaded) return;

  const loadTimer = setTimeout(() => {
    setIsLoaded(true);
  }, 2400);

  return () => clearTimeout(loadTimer);
}, [videoLoaded]);

  return (
    <div className={`${styles.loader_wrapper} ${isLoaded ? styles.loaded : ""}`}>
      <video
        ref={videoRef}
        className={styles.video_background}
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={video} type="video/webm" />
        <p>No HTML5 video support</p>
      </video>
      <div className={styles.progress} />
    </div>
  );
}