import Head from "next/head";
import { NavBar } from "@/components/Navbar/NavBar";
import { Movie } from "@/components/Movie/Movie";
import { MainContent } from "@/layouts/MainContent";
import { MovieGrid } from "@/layouts/MovieGrid/MovieGrid";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MOVIES } from "@/graphql/queries/movieQueries";
import { useContext, useEffect, useState } from "react";
import { GET_AUTH_USER, GET_USER } from "@/graphql/queries/userQueries";
import { userContext } from "./_app";
import { app } from "@/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [firstRun, setFirstRun] = useState(true);
  const [getAuthUser, userRes] = useLazyQuery(GET_AUTH_USER);
  const movieRes = useQuery(GET_MOVIES, { variables: { limit: 12 } });
  const userctx = useContext(userContext);

  if (movieRes.error) return <p>Error : {movieRes.error.message}</p>;

  useEffect(() => {
    handleGetAuthUser();
  }, []);

  function handleGetAuthUser() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const setUser = userctx?.setUser!;
        if (firstRun) {
          getAuthUser({
            variables: { email: user.email },
            onCompleted: (data) => setUser(data.get_authuser),
          });
          setFirstRun(false);
        }
      } else {
      }
    });
  }

  return (
    <>
      <Head>
        <title>Cinematic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <MainContent
        title="Recent Movies"
        isLoading={movieRes.loading && userRes.loading}
      >
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
