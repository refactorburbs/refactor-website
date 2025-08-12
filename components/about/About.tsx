import { ASSETS } from "@/lib/constants/assets.constants";
import DesktopAbout from "./DesktopAbout";
import MobileAbout from "./MobileAbout";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import Image from "next/image";

import styles from "./about.module.css";

const footballsimCharacters = ASSETS.IMAGES.ABOUT.footballsimCharacters;

export default function About () {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.gradient_drop} />

      <div className={`section-content-wrapper ${styles.content_wrapper}`}>
        <div className="thin-divider" />

        <DesktopAbout />
        <MobileAbout />

        <div className={styles.image_positioner}>
          <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.2} thresholdOut={0.7}>
            <Image
              src={footballsimCharacters}
              alt="Football Simulator character closeups"
              width={3840}
              height={2160}
              className={styles.football_character_closeup}
            />
          </ScrollAnimatedElement>
        </div>
      </div>
    </section>
  )
}