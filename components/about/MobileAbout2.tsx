import AnimatedHeader from "../AnimatedHeader";
import ScrollAnimatedElement from "../ScrollAnimatedElement";

import styles from "./about2.module.css";

export default function MobileAbout2 () {
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
    </div>
  );
}