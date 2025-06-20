import { HERO_VIDEO } from "@/lib/constants/images.constants";
import PagePreloader from "./PagePreloader";
import LEDOverlay from "./LEDOverlay";
import RotatingHeroText from "./RotatingHeroText";

import styles from "./home.module.css";
const video = HERO_VIDEO;

export default function Home() {
  return (
    <section id="home" className={styles.home}>
      <PagePreloader />
      <div className={styles.hero_content_wrapper}>
        <LEDOverlay />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="eager"
          className={styles.video_bg}
        >
          <source
            src={video}
            type="video/webm"
          />
          <p>No HTML5 video support.</p>
        </video>
        <RotatingHeroText />
      </div>
    </section>
  );
}