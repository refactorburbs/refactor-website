"use client";

import { A16Z_LOGO } from "@/lib/constants/images.constants";
import { useEffect, useRef, useState } from "react";
import AnimatedHeader from "../AnimatedHeader";
import Image from "next/image";

import styles from "./about.module.css";

const a16z = A16Z_LOGO;

export default function MobileAbout() {
  const [isVisible, setIsVisible] = useState(false);
  const animatedTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 1 }
    );

    if (animatedTextRef.current) {
      observer.observe(animatedTextRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.mobile_about}>
      <AnimatedHeader title="About Us"/>
      <div
        ref={animatedTextRef}
        className={`${isVisible ? "about-content-stagger-in" : ""} about-content-before-animation ${styles.about_content}`}
      >
        <p className="gradient-text-multiline">
          BUILDING <br/>
          THE FUTURE <br/>
          OF SPORTS <br/>
          VIDEO GAMES
        </p>
        <div className={`about-logos ${styles.logos}`}>
          <span>BACKED BY THE BEST:</span>
          <Image
            src={a16z}
            alt="A16Z Speedrun logo"
            width={714}
            height={176}
            className={styles.a16z_logo}
          />
        </div>
      </div>
    </div>
  );
}