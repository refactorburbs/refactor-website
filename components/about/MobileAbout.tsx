import AnimatedHeader from "../AnimatedHeader";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import { ASSETS } from "@/lib/constants/assets.constants";
import Image from "next/image";

import styles from "./about.module.css";
const a16z = ASSETS.IMAGES.ABOUT.a16zLogo;

export default function MobileAbout () {
  return (
    <div className={styles.mobile_about}>
      <AnimatedHeader title="About Us" />

        <div className={styles.building_text_positioner}>
          <ScrollAnimatedElement
            directionIn="up"
            thresholdIn={0.8}
            directionOut="up"
            thresholdOut={0.2}
            rootMargin="0px 0px -100px 0px"
          >
            <p className={`gradient-text-multiline ${styles.building_text}`}>
              BUILDING <br/>
              THE FUTURE <br/>
              OF SPORTS <br/>
              VIDEO GAMES
            </p>
          </ScrollAnimatedElement>
        </div>

        <div className={styles.logos_positioner}>
          <ScrollAnimatedElement
            directionIn="up"
            thresholdIn={0.9}
            directionOut="up"
            thresholdOut={0.25}
            rootMargin="0px 0px -100px 0px"
          >
            <div className={`${styles.logos}`}>
              <span>BACKED BY THE BEST:</span>
              <Image
                src={a16z}
                alt="A16Z Speedrun logo"
                width={714}
                height={176}
                className={styles.a16z_logo}
              />
            </div>
          </ScrollAnimatedElement>
        </div>
    </div>
  );
}