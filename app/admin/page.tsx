import { getCredentials } from "@/lib/utils/general.utils";
import CredentialCard from "./CredentialCard";

import styles from "./page.module.css";

export default function AdminPage() {
  const { github, prisma, pinata, emailjs } = getCredentials();
  return (
    <div>
      <div className={styles.written_content}>
        <h2>Website Info</h2>
        <p>The Refactor Website is located on
          <a
            href="https://github.com/refactorburbs/refactor-website"
            target="_blank"
            rel="noopener noreferrer"
          >{" Nate's Personal GitHub "}</a>
          account (so that we can deploy on Vercel with a hobby account - if it was on the
            <a
              href="https://github.com/Refactor-Games"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" Refactor Organization "}
            </a> account, we would have to pay for Vercel Pro and get seats
          ). If you need to make source code edits,
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" add the developer as a collaborator"}
          </a>.
        </p>

        <h2>How to Manage Assets (Images/Videos)</h2>
        <p>Assets are hosted on a GitHub repository in the Refactor Organization account and
          delivered via CDN. See this
          <a
            href="https://github.com/Refactor-Games/cdn/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" README "}
          </a> for managing website images and videos:
          <ul className={styles.list}>
            <li>Find asset URLs</li>
            <li>Update or add new content</li>
            <li>See where assets are referenced in the source code</li>
          </ul>
        </p>

        <h2>How to Change the Source Code</h2>
        <p>See this
          <a
            href="https://github.com/refactorburbs/refactor-website/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" README "}
          </a>
          for how to clone the project and make changes.
        </p>

        <h2>Quick Links</h2>
        <a
          href="https://github.com/refactorburbs/refactor-website/blob/main/components/team/Team.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Change the Team Description
        </a>
        <a
          href="https://github.com/refactorburbs/refactor-website/blob/main/components/contact/OurDetails.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Updating Google Maps Location (iframe)
        </a>
      </div>
      <div className={styles.credential_grid}>
        <CredentialCard
          title="EmailJs Credentials"
          description="For making or revising automated email templates"
          email={emailjs.email}
          password={emailjs.password}
        />
        <CredentialCard
          title="Pinata Credentials"
          description="For if you need to generate new keys or directly view/delete public files"
          email={pinata.email}
          password={pinata.password}
        />
        <CredentialCard
          title="GitHub Credentials"
          description="(Rare Circumstance) For if you need to authenticate with other services like Vercel"
          email={github.email}
          password={github.password}
        />
        <CredentialCard
          title="Prisma Credentials"
          description="(Rare Circumstance) For if you need to generate new keys or connect to a new database"
          email={prisma.email}
          password={prisma.password}
        />
      </div>
    </div>
  );
}