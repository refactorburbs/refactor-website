import Divider from "../Divider";
import LeaveAMessage from "./LeaveAMessage";
import OurDetails from "./OurDetails";

import styles from "./contact.module.css";

export default function Contact () {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.offset_divider}>
        <Divider title="Contact Us" isUnderlined={true} isSlanted={false}/>
      </div>

      <div className="section-content-wrapper">
        <div className={styles.contact_content_wrapper}>
          <LeaveAMessage />
          <OurDetails />
        </div>
      </div>
    </section>
  )
}