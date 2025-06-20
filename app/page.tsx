import Navbar from "@/components/navbar/Navbar";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import Games from "@/components/games/Games";
import Team from "@/components/team/Team";
import Careers from "@/components/careers/Careers";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

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
