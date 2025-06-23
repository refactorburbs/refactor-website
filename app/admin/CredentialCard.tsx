import CopyToClipboardIcon from "./CopyToClipboardIcon";

import styles from "./credentialCard.module.css";

interface CredentialCardProps {
  title: string;
  description?: string;
  email: string;
  password: string;
}

export default function CredentialCard({ title, description, email, password }: CredentialCardProps) {
  return (
    <div className={styles.credential_card}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>
          {title}
        </h3>
        <span className={styles.card_subtitle}>
          {description}
        </span>
      </div>
      <div className={styles.credential}>
        <label>
          Email:
        </label>
        <input
          type="text"
          value={email}
          readOnly
          className={styles.secret_input}
        />
        <CopyToClipboardIcon text={email}/>
      </div>
      <div className={styles.credential}>
        <label>
          Password:
        </label>
        <input
          type="password"
          value={password}
          readOnly
          className={styles.secret_input}
        />
        <CopyToClipboardIcon text={password}/>
      </div>
    </div>
  );
}