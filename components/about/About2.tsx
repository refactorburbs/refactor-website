import { ASSETS } from "@/lib/constants/assets.constants";
import DesktopAbout2 from "./DesktopAbout2";
import MobileAbout2 from "./MobileAbout2";
// import ScrollAnimatedElement from "../ScrollAnimatedElement";
import Image from "next/image";

import styles from "./about2.module.css";
import ScrollAnimatedElement from "../ScrollAnimatedElement";

const footballsimCharacters = ASSETS.IMAGES.ABOUT.footballsimCharacters;
const a16z = ASSETS.IMAGES.ABOUT.a16zLogo;

export default function About () {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.gradient_drop} />

      <div className={`section-content-wrapper ${styles.content_wrapper}`}>
        <div className="thin-divider" />

        <DesktopAbout2 />
        <MobileAbout2 />

        {/* <p className={`gradient-text-multiline ${styles.building_text}`}>
          BUILDING <br/>
          THE FUTURE <br/>
          OF SPORTS <br/>
          VIDEO GAMES
        </p> */}

        <div className={styles.image_positioner}>
          <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.3}>
            <Image
              src={footballsimCharacters}
              alt="Football Simulator character closeups"
              width={3840}
              height={2160}
              className={styles.football_character_closeup}
            />
          </ScrollAnimatedElement>
        </div>

        {/* <div className={`about-logos ${styles.logos}`}>
          <span>BACKED BY THE BEST:</span>
          <Image
            src={a16z}
            alt="A16Z Speedrun logo"
            width={714}
            height={176}
            className={styles.a16z_logo}
          />
        </div> */}
      </div>
    </section>
  )
}