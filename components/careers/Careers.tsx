import { ASSETS } from "@/lib/constants/assets.constants";
import AnimatedHeader from "../AnimatedHeader";
import Image from "next/image";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import { getAllJobPostings } from "@/app/actions/jobs.actions";
import JobCardList from "./JobCardList";

import styles from "./careers.module.css";

const neymar = ASSETS.IMAGES.CAREERS.neymar;
const soccerBall = ASSETS.IMAGES.CAREERS.trionda;

export default async function Careers() {
  const jobPosts = await getAllJobPostings(false);

  return (
    <section className={styles.careers}>
      <div className={styles.gradient_drop} />
      <div className="section-content-wrapper">
        <AnimatedHeader title="Careers" rootMargin="0px 0px -100px 0px"/>
        <div id="careers"/>
        <div className={styles.careers_content}>
          <h2>JOB OPENINGS</h2>
          <span className={styles.careers_subtext}>
            Are you a talented and motivated individual? We would love to have you on our team.
          </span>
          <JobCardList jobPosts={jobPosts}/>
        </div>
        <div className="thin-divider" />
        <div className={styles.spacer} />
      </div>

      <div className={styles.fifa_ball}>
        <Image
          src={soccerBall}
          alt="FIFA Ball"
          width={707}
          height={882}
        />
      </div>

      <div className={`${styles.neymar}`}>
        <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.25} thresholdOut={0.75}>
          <Image
            src={neymar}
            alt="Neymar making a heart gesture"
            width={698}
            height={882}
          />
        </ScrollAnimatedElement>
      </div>
    </section>
  );
}