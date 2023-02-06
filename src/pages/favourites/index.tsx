import { Movie } from "@/components/Movie/Movie";
import { NavBar } from "@/components/Navbar/NavBar";
import { MainContent } from "@/layouts/MainContent";
import { MovieGrid } from "@/layouts/MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import styles from "./Favourites.module.scss";

export default function Favourites() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    firstLoad();
  }, []);

  async function firstLoad() {
    const moviesString = localStorage.getItem("favourites");
    const parsedMovies = JSON.parse(moviesString || "[]");
    setMovies(parsedMovies);
    console.log(parsedMovies);
    setLoading(false);
  }

  return (
    <>
      <NavBar />
      <MainContent title="Favourites" isLoading={loading}>
        <MovieGrid>
          {movies.length ? (
            movies.map((m: Movie) => {
              return (
                <Movie
                  key={m.id}
                  id={m.id}
                  imageUrl={m.image}
                  name={m.name}
                  rating={m.rating}
                  type={m.type}
                />
              );
            })
          ) : (
            <p className={styles.nofav_text}>
              You don&apos;t have any favourites 🤐
            </p>
          )}
        </MovieGrid>
      </MainContent>
    </>
  );
}

interface Movie {
  id: number;
  rating: number;
  name: string;
  image: string;
  type: string;
}
