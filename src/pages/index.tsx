import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { NavBar } from "@/components/Navbar/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cinematic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.main_section}>hiii</div>
      </main>
    </>
  );
}
