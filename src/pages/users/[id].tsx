import styles from "./Users.module.scss";
// import movies from "../../../data/movies.json";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../_app";
import moment from "moment";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";

export default function UserById() {
  const userctx = useContext(userContext);
  let user = userctx?.user;
  const isuserexists = user ? true : false;

  const userRes = useQuery(GET_USER, {
    variables: { userId: 2 },
    skip: isuserexists,
  });

  if (userRes.loading) return <h1>Loading</h1>;
  if (!isuserexists) user = userRes.data?.get_user;
  const joined = moment(user?.createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <img
          className={styles.userimg}
          src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user?.name}&scale=80`}
        />
        <h2 className={styles.name}>{user?.name}</h2>
        {user?.country && (
          <p className={styles.country}>Country: {user.country}</p>
        )}
        <p className={styles.joined}>Joined {joined}</p>
      </div>
      <p className={styles.movies_count}>Movies: {user?.movies.length}</p>
      <div className={styles.movies_container}>
        {user?.movies.map((movie) => {
          return (
            <Movie
              id={movie.id}
              key={movie.id}
              image={movie.image}
              name={movie.name}
              rating={movie.rating}
              type={movie.type}
            />
          );
        })}
      </div>
    </div>
  );
}

function Movie({ id, image, name, rating, type }: MovieProps) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);
  const ratingColor = setRatingColor(rating);

  return (
    <Link className={styles.link_container} href={`/movies/${id}`}>
      <div className={styles.movie_container}>
        <img src={image} className={styles.movieimg} />
        <div className={styles.content_container}>
          <h2>{name}</h2>
          <p>{type}</p>
          <span
            className={styles.rating_box}
            style={{ backgroundColor: ratingColor }}
          >
            {ratingNum}
          </span>
        </div>
      </div>
    </Link>
  );
}

function setRatingColor(rating: number) {
  if (rating > 7.5) return "#277B44";
  else if (rating > 6) return "#B88A1F";
  else return "#BC4838";
}

interface MovieProps {
  id: number;
  image: string;
  name: string;
  type: string;
  rating: number;
}
