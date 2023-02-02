import Head from "next/head";
import { NavBar } from "@/components/Navbar/NavBar";
import { Movie } from "@/components/Movie/Movie";
import { MainContent } from "@/layouts/MainContent";
import { MovieGrid } from "@/layouts/MovieGrid/MovieGrid";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "@/graphql/queries/movieQueries";
import styles from "@/styles/Home.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const movieRes = useQuery(GET_MOVIES, { variables: { limit: 12 } });

  useEffect(() => {
    if (movieRes.loading) setLoading(true);
    if (movieRes.error) {
      console.log(movieRes.error);
      setLoading(true);
    }
  }, [movieRes]);

  return (
    <>
      <Head>
        <title>Cinematic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <MainContent title="Recent Movies" isLoading={loading}>
        <MovieGrid>
          {movieRes?.data?.get_movies.map((movie: any) => {
            return (
              <Movie
                id={movie.id}
                key={movie.id}
                name={movie.name}
                rating={movie.rating}
                type={movie.type}
                imageUrl={movie.image}
              />
            );
          })}
        </MovieGrid>
      </MainContent>
    </>
  );
}
