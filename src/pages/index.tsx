import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { NavBar } from "@/components/Navbar/NavBar";
import { Movie } from "@/components/Movie/Movie";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cinematic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.top_bar}></div>

        <div className={styles.main_content}>
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
          <Movie
            name="Intestellar"
            rating={8.5}
            type="SciFi, Adventure"
            imageUrl="https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_interstellar.jpg"
          />
        </div>
      </main>
    </>
  );
}
