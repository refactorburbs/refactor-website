"use client";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import styles from "./credentialCard.module.css";

export default function CopyToClipboardIcon({ text }: { text: string }) {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false)
    }, 500)
  }

  return (
    <div
      onClick={() => copyToClipboard(text)}
      className={styles.clipboard_icon}
    >
      {showToast ? <span>Copied!</span> : (
        <FontAwesomeIcon icon={faCopy}/>
      )}
    </div>
  );
}