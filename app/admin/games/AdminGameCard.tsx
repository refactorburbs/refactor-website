import { IGameData } from "@/lib/types/games.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import DeleteGameButton from "./DeleteGameButton";
import Image from "next/image";
import Link from "next/link";

import styles from "./adminGameCard.module.css";

interface GameCardProps {
  game: IGameData;
}

export default function AdminGameCard({ game }: GameCardProps) {
  return (
    <div className={styles.admin_game_card}>
      <div className={styles.game_info}>
        <Image
          src={game.headerImage || "/image-not-found.png"}
          alt={`${game.name} Header`}
          width={460}
          height={215}
          className={styles.game_header_image}
        />
        <div className={styles.game_identification}>
          <span className={styles.game_name}>{game.name}</span>
          <span>{`Steam App ID: ${game.id}`}</span>
          <a href={game.storePage} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faUpRightFromSquare}/>{" "}
            Store Page
          </a>
        </div>

      </div>

      <div className={styles.game_buttons}>
        <Link
          href={`/admin/games/edit/${game.id}`}
          className={styles.edit_button}
        >
          <FontAwesomeIcon icon={faEdit} className={styles.edit_icon}/>
        </Link>
        <DeleteGameButton
          gameId={game.id}
          gameName={game.name}
        />
      </div>
    </div>
  );
}