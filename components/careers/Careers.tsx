import { FOOTBALLSIM_HEAD, FOOTBALLSIM_HELMET } from "@/lib/constants/images.constants";
import AnimatedHeader from "../AnimatedHeader";
import Image from "next/image";
import ScrollAnimatedElement from "../ScrollAnimatedElement";
import { getJobPosts } from "@/lib/api/jobPosts.api";
import JobCardList from "./JobCardList";

import styles from "./careers.module.css";

const footballSimHead = FOOTBALLSIM_HEAD;
const footballSimHelmet = FOOTBALLSIM_HELMET;

export default async function Careers() {
  const jobPosts = await getJobPosts();
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
      <ScrollAnimatedElement directionIn="left" thresholdIn={0.1} once={true}>
        <div className={styles.football_head}>
          <Image
            src={footballSimHead}
            alt="Football Simulator Character Head"
            width={995}
            height={667}
          />
        </div>
      </ScrollAnimatedElement>

      <div className={`${styles.football_helmet}`}>
        <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.75} thresholdOut={0.25}>
          <Image
            src={footballSimHelmet}
            alt="Football Simulator Character Helmet"
            width={496}
            height={494}
            className="football-helmet"
          />
        </ScrollAnimatedElement>
      </div>
    </section>
  );
}