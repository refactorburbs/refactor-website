"use client";

import { ASSETS } from "@/lib/constants/assets.constants";
import { useState } from "react";
import Divider from "../Divider";
import Image from "next/image";
import ScrollAnimatedElement from "../ScrollAnimatedElement";

import styles from "./team.module.css";
import PaginationButtons from "../PaginationButtons";

const carouselImages = [
  ASSETS.IMAGES.TEAM.smiling,
  ASSETS.IMAGES.TEAM.silly,
  ASSETS.IMAGES.TEAM.refactor00,
  ASSETS.IMAGES.TEAM.refactor01,
  ASSETS.IMAGES.TEAM.refactor02,
  ASSETS.IMAGES.TEAM.refactor03,
  ASSETS.IMAGES.TEAM.refactor04,
]

const teamHeroImage = ASSETS.IMAGES.TEAM.fifaTeam;

export default function Team() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalSlides = carouselImages.length;
  const canGoLeft = currentImageIndex > 0;
  const canGoRight = currentImageIndex < totalSlides - 1;

    const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };


  return (
    <section id="team" className={styles.team}>
      <div className={styles.offset_divider}>
        <Divider title="Team" isUnderlined={true} isSlanted={true}/>
      </div>
      <div className={`${styles.team_section} section-content-wrapper`}>
        <div className={styles.team_content}>
          <ScrollAnimatedElement directionIn="right">
            <div className={styles.team_description}>
              <div className={styles.team_text}>
                <p>{`The team at Refactor Games is made up of talent from EA Sports, 2K Sports, Survios, OneTeam
                  Partners, and more. We're a crew of seasoned builders, operators,
                  and engineers who've launched hit games, scaled platforms, and led iconic IP partnerships
                  across gaming and sports. With deep roots in game development, licensing, and live ops,
                  we're focused on building the next generation of sports games.`}
                </p>
              </div>
              <div className={styles.team_video}>
                <iframe
                  width="672"
                  height="378"
                  src="https://www.youtube-nocookie.com/embed/rIwM1Zibk7M?si=STemAostCqMFQqdQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </ScrollAnimatedElement>

          <ScrollAnimatedElement directionIn="left">
            <div className={styles.image_carousel}>
              <Image
                src={carouselImages[currentImageIndex]}
                alt={`Refactor team image ${currentImageIndex + 1}`}
                width={2560}
                height={1920}
                className={styles.responsive_photo}
              />
              <PaginationButtons
                canGoLeft={canGoLeft}
                canGoRight={canGoRight}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                currentIndex={currentImageIndex}
                totalItems={totalSlides}
              />
            </div>
          </ScrollAnimatedElement>
        </div>
        <div className="thin-divider" />
        <Image
          src={teamHeroImage}
          alt={`FIFA Mixed Team`}
          width={1500}
          height={882}
          className={styles.fifa_team_photo}
        />
      </div>
    </section>
  );
}