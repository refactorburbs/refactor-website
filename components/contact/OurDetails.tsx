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
                139 S Beverly Dr. Beverly Hills, CA 90212
              </span>
            </p>
          </li>
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1320520152967!2d-118.3994361!3d34.066129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbf937d1899d%3A0x84406bc711c11fb9!2s139%20S%20Beverly%20Dr%2C%20Beverly%20Hills%2C%20CA%2090212!5e0!3m2!1sen!2sus!4v1755015758337!5m2!1sen!2sus"
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