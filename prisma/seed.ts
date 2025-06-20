// If you need to start with a fresh database, use this seed file to populate the tables with some data.
// In the package.json, there is a script command for prisma to seed.
// In the terminal, run: npx prisma db seed

import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const steamGames: Prisma.SteamGameCreateInput[] = [
  {
    steamId: 1488560,
    name: "Football Simulator (Early Access)",
    storePage: "https://store.steampowered.com/app/1488560/Football_Simulator/"
  }
];

const jobPostings: Prisma.JobPostingCreateInput[] = [
  {
    title: "UI/UX / Front-End Designer - UE5",
    summary: "We are looking for a UI/UX Designer to create responsive, intuitive, and beautiful user interfaces for our football game.",
    tags: ["Unreal Engine 5", "UI/UX", "Design", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a UI/UX Designer to create responsive, intuitive, and beautiful user interfaces for our football game."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game"],
    responsibilities: ["Design wireframes, prototypes, and final UI layouts", "Implement UI using UMG and/or Slate in Unreal Engine 5", "Ensure UI scales well across PC and console platforms", "Design UX for keygame flows: squad building, match lobbies, progression, settings.", "Collaborate closely with design and engineering"],
    requirements: ["3+ years of experience designing UI/UX for games.", "Strong UE5 UMG implementation skills", "Understanding of responsive UI design for controller and keyboard/mouse.", "Familiarity with sports game UI conventions (broadcast-inspired overlays, HUD clarity)."],
    pluses: ["Soccer game UI experience", "UX tuning for fast-paced, competitive game flows"]
  },
  {
    title: "QA Tester - UE5",
    summary: "We are looking for a QA Tester to test a complex, competitive football game.",
    tags: ["Unreal Engine 5", "QA Testing", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a QA Tester to test a complex, competitive football game."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game."],
    responsibilities: ["Test gameplay, multiplayer, progression systems, and live features.", "Write detailed and actionable bug reports.", "Verify fixes across platforms.", "Test for polish and edge cases in player control, AI behavior, and UI flows."],
    requirements: ["2+ years QA experience on UE4/UE5 games.", "Familiarity with competitive sports games and their expectations.", "Strong communication and attention to detail.", "Experience testing online multiplayer games."],
    pluses: []
  },
  {
    title: "Game Producer - UE5",
    summary: "We are looking for a Game Producer to keep our Unreal Engine 5 team running smoothly and help us ship a polished, competitive football game.",
    tags: ["Unreal Engine 5", "Production", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a Game Producer to keep our Unreal Engine 5 team running smoothly and help us ship a polished, competitive football game."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game"],
    responsibilities: ["Run daily standups, sprint planning, retrospectives, and manage backlogs.", "Track progress across multiple feature teams (gameplay, rendering, UI, audio).", "Help unblock team members and foster clear communication.", "Work with leadership to align production schedules with business goals.", "Ensure smooth collaboration between gameplay teams and art/animation pipelines."],
    requirements: ["4+ years of game production experience on multi-disciplinary teams.", "Certified Scrum Master or equivalent agile project management experience.", "Strong familiarity with Unreal Engine 5 production workflows.", "Experience shipping at least one console/PC game.", "Strong organizational and leadership skills."],
    pluses: ["Experience with large sports game teams or multi-season live games."]
  },
  {
    title: "Core Game Designer - UE5",
    summary: "We are looking for a Core Game Designer to own the design of core moment-to-moment gameplay for our football game. If you know what makes a pass feel great in EA FC, why ball physics matters in Pro Evo, or why a well-designed first-touch mechanic can make or break immersion, this is the job for you.",
    tags: ["Unreal Engine 5", "Game Design", "Core Gameplay", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a Core Game Designer to own the design of core moment-to-moment gameplay for our football game. If you know what makes a pass feel great in EA FC, why ball physics matters in Pro Evo, or why a well-designed first-touch mechanic can make or break immersion, this is the job for you."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game."],
    responsibilities: ["Design and iterate on core gameplay systems: player control, ball physics, shooting, passing, skill moves, dribbling, defending, collisions, player interactions.", "Work closely with engineers and animators to prototype and refine gameplay mechanics.", "Own tuning of player attributes, input responsiveness, animation transitions, and gameplay balance.", "Study and deconstruct the best football games on the market.", "Ensure authenticity, fluidity, and fun in every on-pitch interaction."],
    requirements: ["Deep knowledge of football video games (EA FC, Pro Evo, UFL, Football Manager, etc.).", "Passion for real-world football: player behaviors, tactics, styles of play.", "Proven experience designing and tuning core gameplay in Unreal Engine 5.", "Ability to analyze player feedback and telemetry data to refine gameplay.", "Experience shipping at least one football or sports title (or demonstrable equivalent experience)."],
    pluses: ["Knowledge of broadcast camera angles and camera behavior for sports games.", "Experience tuning AI difficulty, skill systems, and input latency mitigation."]
  },
  {
    title: "Character Artist - UE5",
    summary: "We are looking for a Character Artist to model and texture football players and supporting characters.",
    tags: ["Unreal Engine 5", "Character Art", "3D Models", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a Character Artist to model and texture football players and supporting characters."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game."],
    responsibilities: ["Model, UV, and texture player characters.", "Collaborate with rigging and animation teams to ensure excellent deformation.", "Support player customization features.", "Maintain fidelity and performance targets."],
    requirements: ["3+ years of character art experience in games.", "Experience with UE5 character pipelines.", "Strong knowledge of anatomy and clothing.", "Familiarity with football player visuals and real-world player references."],
    pluses: []
  },
  {
    title: "Product Manager - UE5",
    summary: "We are looking for a Product Manager to own the business and product vision for our football game. You will work closely with leadership, data analysts, and the design team to ensure the game delivers competitive fun and business success.",
    tags: ["Unreal Engine 5", "Product Vision", "Business", "Sports Video Games", "Football/Soccer"],
    aboutTheJob: ["Refactor Games is a AAA sports video game studio. We are developing the next generation of professional football (soccer) video games using Unreal Engine 5.", "We are looking for a Product Manager to own the business and product vision for our football game. You will work closely with leadership, data analysts, and the design team to ensure the game delivers competitive fun and business success."],
    experience: ["3+ years developing games for console and/or PC, ideally sports or competitive multiplayer.", "At least 1 shipped high-quality football game or a similar sports game."],
    responsibilities: ["Define product KPIs: retention, engagement, monetization, NPS, player happiness.", "Work with design to ensure features meet both gameplay and business goals.", "Collaborate with marketing on live ops strategy and seasonal content.", "Analyze player data and market trends; inform roadmap decisions.", "Communicate product priorities clearly across the team."],
    requirements: ["3+ years of product management experience on live F2P games.", "Deep understanding of football games and player expectations.", "Strong analytical mindset; comfortable working with telemetry and KPIs.", "Proven ability to align teams around product goals."],
    pluses: ["Experience managing football or sports games.", "Experience managing cross-platform live games."]
  },
]

export async function main() {
  for (const game of steamGames) {
    await prisma.steamGame.create({ data: game });
  }
  for (const jobPost of jobPostings) {
    await prisma.jobPosting.create({ data: jobPost });
  }
}

main();