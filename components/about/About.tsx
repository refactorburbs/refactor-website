import { ASSETS } from "@/lib/constants/assets.constants";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import DesktopAbout from "./DesktopAbout";
import MobileAbout from "./MobileAbout";
import Image from "next/image";

import styles from "./about.module.css";

const footballsimCharacters = ASSETS.IMAGES.ABOUT.footballsimCharacters;

export default function About () {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.gradient_drop} />

      <div className="section-content-wrapper">
        <div className="thin-divider" />
        <DesktopAbout />
        <MobileAbout />

        <div className="thin-divider" />

        <div className={styles.overlay_images}>
          <ScrollAnimatedElement directionIn="up" thresholdIn={0.4}>
            <Image
              src={footballsimCharacters}
              alt="Football Simulator character closeups"
              width={2311}
              height={1274}
              className={styles.football_character_closeup}
            />
          </ScrollAnimatedElement>
        </div>
      </div>
    </section>
  )
}