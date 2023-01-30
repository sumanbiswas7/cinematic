import { NavBar } from "@/components/Navbar/NavBar";
import { SingleMovie } from "@/components/SingleMovie/SingleMovie";
import { GET_MOVIE } from "@/graphql/queries/movieQueries";
import { MainContent } from "@/layouts/MainContent";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./movieById.module.scss";

export default function MovieById() {
  const router = useRouter();
  const { id } = router.query;
  const movieId = parseInt(id as string);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error : {error.message}</p>;

  const movie = data.get_movie as Movie;
  console.log(movie);
  return (
    <>
      <NavBar />
      <MainContent>
        <div className={styles.container}>
          <SingleMovie
            id={movie.id}
            director={movie.director}
            description={movie.description}
            image={movie.image}
            name={movie.name}
            rating={movie.rating}
            release={movie.release}
            type={movie.type}
            key={movie.id}
            casts={movie.casts}
          />
        </div>
      </MainContent>
    </>
  );
}

interface Movie {
  id: number;
  name: string;
  rating: number;
  type: string;
  image: string;
  description: string;
  release: string;
  director: string;
  casts: string;
}
