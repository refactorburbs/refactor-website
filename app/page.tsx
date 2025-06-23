import dynamic from "next/dynamic";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/components/home/Home";
import Footer from "@/components/footer/Footer";
// Lazy load sections below the fold
const About = dynamic(() => import("@/components/about/About"));
const Games = dynamic(() => import("@/components/games/Games"));
const Team = dynamic(() => import("@/components/team/Team"));
const Careers = dynamic(() => import("@/components/careers/Careers"));
const Contact = dynamic(() => import("@/components/contact/Contact"));

import styles from "./page.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Home />
        <About />
        <Games />
        <Team />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
