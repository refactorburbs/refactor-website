import { fetchAllGameCards } from "@/app/actions";
import Divider from "../Divider";
import GameCard from "./GameCard";

import styles from "./games.module.css";

export default async function Games() {
  const games = await fetchAllGameCards();

  return (
    <section id="games" className={styles.games}>
      <div className={styles.offset_divider}>
        <Divider title="Our Games" isUnderlined={true} isSlanted={false}/>
      </div>
      <div className="section-content-wrapper">
        <div className={styles.game_cards_list_wrapper}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="thin-divider" />
        <div className={styles.spacer} />
      </div>
    </section>
  );
}