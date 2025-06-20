"use client";

import { toggleJobApplicationStar } from "@/app/actions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./jobApplicationCard.module.css";

interface StarFavoriteButtonProps {
  applicationId: number;
  isStarred: boolean;
}

export default function StarFavoriteButton({ applicationId, isStarred }: StarFavoriteButtonProps) {
  const [starred, setStarred] = useState(isStarred);

  const handleToggleStar = async () => {
    try {
      const result = await toggleJobApplicationStar(applicationId);

      if (result?.success) {
        setStarred(result.starred);
      }
    } catch (error) {
      console.error("Failed to toggle star:", error);
      alert("Failed to update star status. Please try again.");
    }
  }

  return (
    <div onClick={handleToggleStar}>
      <FontAwesomeIcon
        icon={faStar}
        className={`${styles.star_icon} ${starred ? styles.starred : ""}`}
      />
    </div>
  );
}