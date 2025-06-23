# Refactor Website

This repository contains the source code for the Refactor Games company website built with:

- **Frontend**: ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- **Database**: ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- **File Storage**: Pinata (IPFS)
- **Email**: EmailJS
- **Hosting**: ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
- **Domain**: GoDaddy

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have these installed on your computer:

- **[Node.js v22](https://nodejs.org/)** - JavaScript runtime
- **[Git](https://git-scm.com/downloads)** - Version control
- **[NVM](https://github.com/nvm-sh/nvm)** (recommended) - Node version manager
- **Code Editor** like [VS Code](https://code.visualstudio.com/)

### Getting Started

1. **Clone the repository** to your computer:
   ```bash
   cd your-desired-folder
   git clone https://github.com/refactorburbs/refactor-website.git
   ```

2. **Open the project** in your code editor:
   ```bash
   cd refactor-website
   code .
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cp example.env .env
   ```
   > ⚠️ **Important**: You'll need to add your secret keys to the `.env` file. See the Admin dashboard for login credentials for Prisma, Pinata, and EmailJS.

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Your website will be available at `http://localhost:3000`

## 📝 Making Changes

### Creating a New Feature or Fix

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b your-branch-name
   ```
   > Example: `git checkout -b fix-contact-form` or `git checkout -b add-new-job-posting`

2. **Make your changes** in the code editor

3. **Save and stage your changes**:
   ```bash
   git add -A
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Brief description of what you changed"
   ```
   > Example: `git commit -m "Fix contact form email validation"`

5. **Push your changes** to GitHub:
   ```bash
   git push origin your-branch-name
   ```

6. **Create a Pull Request** on GitHub to merge your changes into the main branch

> ⚠️ **Important**: Never push directly to the `main` branch as it automatically deploys to the live website!

## 🗄️ Database Management

We use **Prisma ORM** with a hosted PostgreSQL database for storing website data (job applications, contact forms, etc.).

### Viewing the Database

To see the database contents in a user-friendly interface:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view, add, edit, and delete records.

![prismaExample](https://github.com/user-attachments/assets/dec0d8c6-bbb3-4a96-a858-38b20e0ccb5f)


### Database Access

**Prisma Account Credentials:**
<br>
(Rare Circumstance) If you need to generate new keys or establish a new database connection, login with your credentials.
- **Website**: [prisma.io](https://prisma.io)
- **Email**: See Admin Dashboard 
- **Password**: See Admin Dashboard

### Making Database Changes

- **Simple changes** (adding/editing records): Use Prisma Studio
- **Structure changes** (new tables/columns): Update the [schema file](https://github.com/refactorburbs/refactor-website/blob/main/prisma/schema.prisma) and run migrations

## 📁 File Storage

We use **Pinata** to store uploaded files (like resumes from job applications) and convert them to web-accessible URLs.

### Pinata Access

**Pinata Account Credentials:**
- **Website**: [pinata.cloud](https://pinata.cloud)
- **Email**: See Admin Dashboard 
- **Password**: See Admin Dashboard 

### How It Works

1. User uploads a resume through the careers page
2. File gets stored on Pinata servers
3. Pinata returns a URL that we save in our database
4. When an application is deleted, the file is automatically removed from Pinata

## 🚀 Deployment

The website is automatically deployed to [refactorgames.com](https://refactorgames.com) using **Vercel**.

### How Deployment Works

- **Automatic**: Any changes pushed to the `main` branch automatically deploy to the live website
- **Free Hosting**: Uses Vercel's hobby plan (hosted under Nate's personal GitHub account)
- **Live in Minutes**: Changes typically go live within 2-3 minutes

### Vercel Access

- **Authentication**: Through Nate's personal GitHub account
- **Dashboard**: Available at [vercel.com](https://vercel.com)

## 🌐 Domain & Email Setup

### Domain Management

Our domain `refactorgames.com` is managed through **GoDaddy** with the following DNS records:

**Vercel Connection:**
- A record → Points to Vercel's servers
- CNAME → Points to our Vercel project

**Email (Google Workspace):**
- 5 MX records for email delivery
- TXT records for SPF, DKIM, DMARC (email security)
- Google site verification

### Email Setup

Company emails (@refactorgames.com) are handled through **Google Workspace** and configured via GoDaddy DNS settings.

## 📋 Privacy Policies

Game privacy policies are hosted on the website to meet platform requirements (like Epic Games Store).

### Adding a New Privacy Policy

1. **Create a new folder** in `app/privacy-policies/` with your game's name
2. **Add a `page.tsx` file** in that folder
3. **Write your privacy policy** using React/JSX
4. **Access it** at: `https://www.refactorgames.com/privacy-policies/your-game-name`

**Example Structure:**
```
app/
└── privacy-policies/
    ├── football-simulator/
    │   └── page.tsx
    └── your-new-game/
        └── page.tsx
```

## 🔧 Environment Variables

The following secret keys need to be configured in your `.env` file and in Vercel:

- Database connection strings (Prisma)
- File storage keys (Pinata)  
- Email service keys (EmailJS)
- Any API keys for third-party services

> See `example.env` for the complete list of required variables.
