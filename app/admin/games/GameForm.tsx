"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { TGameFormState } from "@/lib/types/admin.types";

import styles from "./gameForm.module.css";

interface SteamGame {
  id: number;
  steamId: number;
  name: string;
  storePage: string;
}

interface GameFormProps {
  mode: "create" | "edit";
  game?: SteamGame | null;
  action: (state: TGameFormState, formData: FormData) => Promise<TGameFormState>;
}

export default function GameForm({ mode, game, action }: GameFormProps) {
  const [state, formAction, isPending] = useActionState<TGameFormState, FormData>(action, undefined);
  const [formData, setFormData] = useState({
    steamId: game?.steamId?.toString() || "",
    name: game?.name || "",
    storePage: game?.storePage || "",
  })

  // Update form data when game prop changes (for edit mode)
  useEffect(() => {
    if (game) {
      setFormData({
        steamId: game.steamId.toString(),
        name: game.name,
        storePage: game.storePage,
      })
    }
  }, [game]);

  // Clear form only on successful submission
  useEffect(() => {
    if (!state?.errors && !state?.message && mode === "create") {
      setFormData({
        steamId: "",
        name: "",
        storePage: "",
      })
    }
  }, [state, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className={styles.game_form_wrapper}>
      <div className={styles.form_header}>
        <Link href="/admin/games">
          ← Back to Games
        </Link>
        <h2>{mode === "create" ? "Add New Game" : `Edit ${game?.name || "Game"}`}</h2>
      </div>

      <form action={formAction} className={styles.game_form}>
        <div className={styles.form_group}>
          <label htmlFor="steamId">Steam App ID</label>
          <input
            id="steamId"
            name="steamId"
            type="number"
            placeholder="e.g. 1488560"
            value={formData.steamId}
            onChange={handleInputChange}
            disabled={mode === "edit"}
            className={`${state?.errors?.steamId ? "error" : ""} ${mode === "edit" ? styles.disabled_input : ""}`}
          />
          {mode === "edit" && (
            <small className={styles.field_note}>
              Steam ID cannot be changed after creation
            </small>
          )}
          {state?.errors?.steamId && (
            <span className={styles.error_message}>{state.errors.steamId[0]}</span>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="name">Game Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Football Simulator"
            value={formData.name}
            onChange={handleInputChange}
            className={state?.errors?.name ? "error" : ""}
          />
          {state?.errors?.name && (
            <span className={styles.error_message}>{state.errors.name[0]}</span>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="storePage">Steam Store URL</label>
          <input
            id="storePage"
            name="storePage"
            type="url"
            placeholder="https://store.steampowered.com/app/1488560/"
            value={formData.storePage}
            onChange={handleInputChange}
            className={state?.errors?.storePage ? "error" : ""}
          />
          {state?.errors?.storePage && (
            <span className={styles.error_message}>{state.errors.storePage[0]}</span>
          )}
        </div>

        {state?.message && (
          <div className={styles.error_message}>
            {state.message}
          </div>
        )}

        <button type="submit" disabled={isPending} className={styles.submit_button}>
          <span>
            {isPending
              ? (mode === "create" ? "Creating..." : "Updating...")
              : (mode === "create" ? "Create Game" : "Update Game")
            }
          </span>
        </button>
      </form>
    </div>
  )
}