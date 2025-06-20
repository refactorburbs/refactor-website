"use client";

import { deleteGame } from "@/app/actions/games.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./adminGameCard.module.css";

interface DeleteGameButtonProps {
  gameId: number
  gameName: string
}

export default function DeleteGameButton({ gameId, gameName }: DeleteGameButtonProps) {

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${gameName}"? This action cannot be undone.`
    )

    if (!confirmed) return;

    try {
      await deleteGame(Number(gameId));
    } catch (error) {
      console.error("Failed to delete game:", error);
      alert("Failed to delete game. Please try again.");
    }
  }

  return (
    <div onClick={handleDelete}>
      <FontAwesomeIcon
        icon={faTrash}
        className={styles.trash_icon}
      />
    </div>
  );
}