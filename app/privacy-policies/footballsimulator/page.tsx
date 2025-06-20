import styles from "./page.module.css";

export default function FootballSimulatorPrivacyPolicy() {
  return (
    <div className={styles.privacy_policy_page}>
      <div className={styles.privacy_policy_content_wrapper}>
        <h1 className={styles.pp_h1}>
          Privacy Policy for Football Simulator (Epic Games Store)
        </h1>
        <p>
          <strong className={styles.color_emphasis}>Effective Date:</strong> 6/4/25
        </p>

        <p>
          Thank you for playing Football Simulator. This Privacy Policy describes how we collect, use, and protect your
          information when you play the game through the Epic Games Store, including features such as multiplayer and
          user-generated content via mod.io.
        </p>

        <h2>
          1. Information We Collect
        </h2>
        <div className={styles.section_wrapper}>
          <p>
            We collect the minimum data necessary to operate and improve your gameplay experience.
          </p>

          <h3>
            a. Account & Identity Information
          </h3>
          <ul>
            <li>Epic Account ID and username</li>
            <li>mod.io account information (linked via Epic Account or email)</li>
            <li>Multiplayer identifiers (such as in-game display names or friend lists used for matchmaking)</li>
          </ul>

          <h3>
            b. Gameplay & Technical Data
          </h3>
          <ul>
            <li>Match stats, player preferences, in-game settings</li>
            <li>Crash logs, performance diagnostics, device and OS information</li>
            <li>Logs of game activity relevant to support or moderation</li>
          </ul>

          <h3>
            c. User-Generated Content (UGC)
          </h3>
          <p>
            When you create or upload content (e.g., custom teams, stadiums, assets) via mod.io, we may collect:
          </p>
          <ul>
            <li>Metadata about the content (title, description, file type)</li>
            <li>Download and usage statistics</li>
            <li>Public visibility settings and timestamps</li>
          </ul>
          <p>
            mod.io may collect additional information independently—see their policy:{" "}
            <a href="https://mod.io/privacy" target="_blank" rel="noopener noreferrer">mod.io Privacy Policy</a>
          </p>

          <h3>d. Voluntary Information</h3>
          <p>
            If you contact us for support: your email address, name (if provided), and the content of your request
          </p>
        </div>

        <h2>2. How We Use Your Information</h2>
        <div className={styles.section_wrapper}>
          <ul>
            <li>Enable account-based features and cross-platform play via Epic Online Services (EOS)</li>
            <li>Support multiplayer gameplay and matchmaking</li>
            <li>Allow content creation, upload, and browsing via mod.io</li>
            <li>Monitor community-created content for moderation and terms compliance</li>
            <li>Improve stability, performance, and user experience</li>
            <li>Respond to support inquiries</li>
          </ul>
          <p>We do not sell your personal data or use it for third-party advertising.</p>
        </div>

        <h2>3. Epic Online Services (EOS)</h2>
        <div className={styles.section_wrapper}>
          <p>
            We rely on Epic Online Services for multiplayer features, identity authentication, friends list integration,
            and matchmaking. You can learn more at:{" "}
            <a href="https://www.epicgames.com/site/en-US/privacypolicy" target="_blank" rel="noopener noreferrer">
              Epic Games Privacy Policy
            </a>
          </p>

        </div>

        <h2>
          4. User-Generated Content (UGC)
        </h2>
        <div className={styles.section_wrapper}>
          <p>
            Football Simulator supports community content through mod.io, allowing you to upload and download custom game
            modifications. Any UGC you submit:
          </p>
          <ul>
            <li>May be shared publicly with other users</li>
            <li>Is subject to moderation and content guidelines</li>
            <li>Remains your intellectual property, but may be used within the game as permitted by the mod.io terms</li>
          </ul>
          <p>Users are encouraged to avoid sharing personal data through UGC.</p>
        </div>

        <h2>5. Data Sharing</h2>
        <div className={styles.section_wrapper}>
          <p>We may share data with:</p>
          <ul>
            <li>Epic Games, for multiplayer and platform services</li>
            <li>mod.io, for managing UGC</li>
            <li>Analytics or crash reporting providers, to improve performance and stability</li>
          </ul>
          <p>
            All third parties are bound by their own privacy practices and/or data protection agreements.
          </p>
        </div>

        <h2>6. Data Retention</h2>
        <div className={styles.section_wrapper}>
          <p>We keep your gameplay, UGC, and account data as long as it is necessary for:</p>
          <ul>
            <li>Game functionality</li>
            <li>Legal and compliance obligations</li>
            <li>Handling support or moderation</li>
          </ul>
          <p>You may request deletion of your data at any time (see Section 8).</p>
        </div>

        <h2>7. Your Privacy Rights</h2>
        <div className={styles.section_wrapper}>
          <p>Depending on your region (e.g., EU/EEA, UK, California), you may have rights to:</p>
          <ul>
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion</li>
            <li>Object to certain uses</li>
            <li>File a complaint with a data authority</li>
          </ul>
          <p>To exercise your rights, please email: <a href="mailto:info@refactorgames.com">info@refactorgames.com</a></p>
        </div>

        <h2>8. Policy Updates</h2>
        <div className={styles.section_wrapper}>
          <p>
            We may update this Privacy Policy periodically. We will notify users of material changes via the game or the
            Epic Store page, and post the latest version with a revised effective date.
          </p>
        </div>

        <h2>9. Contact Us</h2>
        <div className={styles.section_wrapper}>
          <p>
            If you have any questions or concerns about this Privacy Policy, contact us at:<br />
            <strong>Refactor Games</strong><br />
            Email: <a href="mailto:info@refactorgames.com">info@refactorgames.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}