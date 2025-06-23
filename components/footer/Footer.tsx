import Image from "next/image";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons_wrapper}>
        <a
          href="https://www.instagram.com/footballsimulatorgame/"
          className={`${styles.footer_img} ${styles.instagram_logo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Football Simulator Instagram"
        >
          <Image
            src="/instagram-logo.svg"
            alt="Football Simulator Instagram"
            width={28}
            height={28}
          />
        </a>
        <a
          href="https://x.com/RefactorGames"
          className={`${styles.footer_svg} ${styles.x_logo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Refactor Games X (Twitter)"
        >
          <svg width="20" height="20" viewBox="0 0 300 301" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_198_21)">
              <path d="M178.57 127.15L290.27 0H263.81L166.78 110.38L89.34 0H0L117.13 166.93L0 300.25H26.46L128.86 183.66L210.66 300.25H300M36.01 19.54H76.66L263.79 281.67H223.13" fill="white" className={styles.svg_path}/>
            </g>
            <defs>
              <clipPath id="clip0_198_21">
                <rect width="300" height="300.251" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/refactorgames/"
          className={`${styles.footer_svg} ${styles.linkedin_logo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Refactor Games LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M186.219 257.368H25.6181C18.4903 257.368 12.7148 263.146 12.7148 270.271V786.214C12.7148 793.342 18.4903 799.117 25.6181 799.117H186.219C193.347 799.117 199.123 793.342 199.123 786.214V270.271C199.123 263.146 193.347 257.368 186.219 257.368Z" fill="white" className={styles.svg_path}/>
            <path d="M105.977 0.879883C47.5407 0.879883 0 48.3689 0 106.741C0 165.138 47.5407 212.645 105.977 212.645C164.366 212.645 211.868 165.135 211.868 106.741C211.871 48.3689 164.366 0.879883 105.977 0.879883Z" fill="white" className={styles.svg_path}/>
            <path d="M594.72 244.544C530.217 244.544 482.535 272.273 453.613 303.781V270.271C453.613 263.146 447.838 257.368 440.71 257.368H286.906C279.778 257.368 274.003 263.146 274.003 270.271V786.214C274.003 793.342 279.778 799.117 286.906 799.117H447.156C454.284 799.117 460.06 793.342 460.06 786.214V530.942C460.06 444.921 483.425 411.409 543.389 411.409C608.695 411.409 613.884 465.133 613.884 535.368V786.217C613.884 793.344 619.66 799.12 626.787 799.12H787.097C794.225 799.12 800 793.344 800 786.217V503.213C800 375.303 775.611 244.544 594.72 244.544Z" fill="white" className={styles.svg_path}/>
          </svg>
        </a>
      </div>
    </footer>
  );
}