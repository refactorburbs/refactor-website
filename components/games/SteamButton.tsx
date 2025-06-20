import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteamSymbol } from "@fortawesome/free-brands-svg-icons";

import styles from "./steamButton.module.css";

export default function SteamButton({ storePage }: { storePage: string }) {
  return (
    <div className={styles.steam_button}>
      <a href={storePage} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faSteamSymbol} className={styles.steam_icon}/>
        <div className={styles.steam_button_text}>
          <span>GET IT ON</span>
          <span className={styles.spaced_letter_text}>
            STEAM
          </span>
        </div>
      </a>
    </div>
  );
}