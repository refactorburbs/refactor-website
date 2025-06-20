import { fetchAllGameCards } from "@/app/actions";
import AdminGameCard from "./AdminGameCard";
import Link from "next/link";
import { getUser } from "@/lib/dal";

import styles from "./games.module.css";

export default async function OurGames() {
  await getUser();
  const games = await fetchAllGameCards();
  return (
    <div className={styles.games_page}>
      <div className={styles.games_header}>
        <h3>Current Games</h3>
        <Link href="/admin/games/add" className={styles.add_button}>
          <span>{"Add +"}</span>
        </Link>
      </div>
      <div className={styles.current_games_list}>
        {games.length > 0 ? (
          games.map((game) => (
            <AdminGameCard game={game} key={game.id}/>
          ))
        ) : (
          <p>No games found. Add your first game!</p>
        )}
      </div>
    </div>
  );
}