"use client";

import { ASSETS } from "@/lib/constants/assets.constants";
import { useState } from "react";
import Divider from "../Divider";
import Image from "next/image";
import ScrollAnimatedElement from "../ScrollAnimatedElement";

import styles from "./team.module.css";

const teamSmiling = ASSETS.IMAGES.TEAM.smiling;
const teamSilly = ASSETS.IMAGES.TEAM.silly;

export default function Team() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="team" className={styles.team}>
      <div className={styles.offset_divider}>
        <Divider title="Team" isUnderlined={true} isSlanted={true}/>
      </div>
      <div className="section-content-wrapper">
        <div className={styles.team_content}>
          <ScrollAnimatedElement directionIn="right">
            <div className={styles.team_description}>
              <div className={styles.team_text}>
                <p>{`The team at Refactor Games is made up of talent from Survios, OneTeam Partners,
                  Wizards of the Coast, N3TWORK, and more. We're a crew of seasoned builders, operators,
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
            <div
              className={`gradient-container ${styles.team_image}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={isHovered ? teamSilly : teamSmiling}
                alt={isHovered ? "Refactor Games Team Photo - Silly" : "Refactor Games Team Photo - Smiling"}
                width={2560}
                height={1920}
                className={styles.responsive_photo}
              />
            </div>
          </ScrollAnimatedElement>
        </div>
        <div className="thin-divider" />
      </div>
    </section>
  );
}