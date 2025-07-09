"use client";

import { useEffect, useState } from "react";
import { HERO_TEXT } from "@/lib/constants/content.constants";

import styles from "./rotatingHeroText.module.css";

export default function RotatingHeroText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

  // Changed this to an interval to handle varying the css class rather than
  // re-rendering the word via useEffect change/key prop to avoid flickering
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("fade-out"); // Start fading out word

      setTimeout(() => {
        // After fade-out is complete, change word and fade back in
        setWordIndex((prev) => (prev + 1) % HERO_TEXT.length);
        setFadeState("fade-in");
      }, 250); // match CSS transition duration
    }, 3650);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.rotating_hero_text_wrapper}>
      <div className={styles.rotating_hero_text}>
        <h1>
          WE CREATE
          <br />
          <span className={`${styles.dynamic_word} ${styles[fadeState]}`}>
            {HERO_TEXT[wordIndex]}
          </span>
          <br />
          GAMES
        </h1>
      </div>
    </div>
  );
}