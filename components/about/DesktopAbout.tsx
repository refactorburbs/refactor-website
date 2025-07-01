import { ASSETS } from "@/lib/constants/assets.constants";
import AnimatedHeader from "../AnimatedHeader";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import Image from "next/image";

import styles from "./about.module.css";

const a16z = ASSETS.IMAGES.ABOUT.a16zLogo;

export default function DesktopAbout() {
  return (
    <div className={styles.desktop_about}>
      <AnimatedHeader title="About Us" rootMargin="0px 0px -400px 0px"/>

      <ScrollAnimatedElement
        directionIn="up"
        thresholdIn={0.75}
        customAnimationInClass="about-content-stagger-in"
        globalClassName="about-content-before-animation z-5"
        once={true}
      >
        <ScrollAnimatedElement
          directionIn="up"
          directionOut="up"
          thresholdIn={0.9}
          thresholdOut={0.1}
        >
          <div className={styles.about_content}>
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
        </ScrollAnimatedElement>
      </ScrollAnimatedElement>
    </div>
  );
}