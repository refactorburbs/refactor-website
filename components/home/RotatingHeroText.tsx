"use client";

import { useEffect, useState } from "react";
import { HERO_TEXT } from "@/lib/constants/home.constants";

import styles from "./rotatingHeroText.module.css";

let currentWordIndex = 0;

export default function RotatingHeroText() {
  const [dynamicWord, setDynamicWord] = useState(HERO_TEXT[currentWordIndex]);

  const chooseNewDynamicWord = () => {
    currentWordIndex = (currentWordIndex + 1) % HERO_TEXT.length;
    setDynamicWord(HERO_TEXT[currentWordIndex]);
  }

  useEffect(function updateDynamicWord() {
    setTimeout(chooseNewDynamicWord, 3650); // every 4 sec ish
  }, [dynamicWord]);

  return (
    <div className={styles.rotating_hero_text_wrapper}>
      <div className={styles.rotating_hero_text}>
        <h1>
          WE CREATE
          <br/>
          <span className={styles.dynamic_word}>
            {dynamicWord}
          </span>
          <br/>
          GAMES
        </h1>
      </div>
    </div>
  );
}