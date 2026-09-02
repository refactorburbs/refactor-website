import { ASSETS } from "@/lib/constants/assets.constants";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import Image from "next/image";

import styles from "./about.module.css";
import AnimatedHeader from "../AnimatedHeader";

const spainTrio = ASSETS.IMAGES.ABOUT.spainTrio;

export default function About () {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.gradient_drop} />

      <div className={`section-content-wrapper`}>
        <div className="thin-divider" />

        <AnimatedHeader title="About Us" rootMargin="0px 0px -400px 0px"/>

        <div className={styles.image_positioner}>
          <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.2} thresholdOut={0.8}>
            <Image
              src={spainTrio}
              alt="FIFA Spain Trio: Yamal, Rodri, and Pedri"
              width={3288}
              height={3662}
              className={styles.football_character_closeup}
            />
          </ScrollAnimatedElement>
        </div>

        <div className={styles.building_text_positioner}>
          <p className={`gradient-text-multiline ${styles.building_text}`}>
            BUILDING <br/>
            THE FUTURE <br/>
            OF SPORTS <br/>
            VIDEO GAMES
          </p>
          {/* <ScrollAnimatedElement
            directionIn="up"
            thresholdIn={0.1}
            directionOut="up"
            thresholdOut={0.9}
            rootMargin="0px 0px -200px 0px"
          >
            <p className={`gradient-text-multiline ${styles.building_text}`}>
              BUILDING <br/>
              THE FUTURE <br/>
              OF SPORTS <br/>
              VIDEO GAMES
            </p>
          </ScrollAnimatedElement> */}
        </div>
      </div>
    </section>
  )
}