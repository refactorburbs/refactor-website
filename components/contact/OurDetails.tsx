import AnimatedHeader from "../AnimatedHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import styles from "./ourDetails.module.css";

export default function OurDetails() {
  return (
    <div className={styles.our_details}>
      <AnimatedHeader title="OUR DETAILS" hasIcon={false} isAnimatingUnderline={true}/>
      <div className={`gradient-container ${styles.details_wrapper}`}>
        <ul className={styles.details_info}>
          <li>
            <FontAwesomeIcon icon={faEnvelope} className={styles.details_icon}/>
            <p className={styles.details_text}>
              <span>
                Email:
              </span>
              <span className={styles.details_clickable}>
                <a href="mailto:info@refactorgames.com">
                  info@refactorgames.com
                </a>
              </span>
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faGlobe} className={styles.details_icon}/>
            <p className={styles.details_text}>
              <span>
                Website:
              </span>
              <span className={styles.details_clickable}>
                <a href="https://www.refactorgames.com/" target="_blank" rel="noopener noreferrer">
                  www.refactorgames.com
                </a>
              </span>
            </p>
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} className={styles.details_icon}/>
            <p className={styles.details_text}>
              <span>
                Address:
              </span>
              <span>
                3025 Airport Ave, #D, Santa Monica, CA 90405
              </span>
            </p>
          </li>
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.1241684300794!2d-118.450490683909!3d34.015023580616045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bafda763ab6f%3A0x28caeacfc85f1c19!2s3025%20Airport%20Ave%2C%20Santa%20Monica%2C%20CA%2090405!5e0!3m2!1sen!2sus!4v1660682037815!5m2!1sen!2sus"
          width="420"
          height="315"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.google_map}
        >
        </iframe>
      </div>
    </div>
  );
}