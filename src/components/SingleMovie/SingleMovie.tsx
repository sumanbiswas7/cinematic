import styles from "./SingleMovie.module.scss";
import { RatingBox } from "./RatingBox";
import { Tags } from "./Tags";
import { AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";

export function SingleMovie({
  director,
  release,
  rating,
  name,
  description,
  image,
  type,
  casts,
}: SingleMovieProps) {
  const CASTS = "Leonardo Dicaprio,Jamie Fox";
  const CASTS_C = CASTS.split(",");
  const movie = {
    id: 2,
    rating,
    name,
    image,
    type,
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.left_card} ${styles.card}`}>
        <img src={image} className={styles.movie_img} />
        <div className={styles.btm_shape}>
          <div className={styles.textcontent}>
            <RatingBox rating={rating} />
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.right_card} ${styles.card}`}>
        <div className={styles.content}>
          <TopRow name={name} movie={movie} />
          <p className={styles.title}>DIRECTOR</p>
          <p className={styles.text}>{director}</p>
          <p className={styles.title}>CASTS</p>
          <Tags data={["Matthew McConaughey", "Jessica Chastain"]} />
          <p className={styles.title}>TYPE</p>
          <Tags data={[type]} />
          <p className={styles.title}>RELEASE YEAR</p>
          <h2 className={styles.release_year}>{release}</h2>
        </div>
        <div className={styles.btm_box}>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
}

function TopRow({ name, movie }: TopRowProps) {
  const [watchadd, setWatchadd] = useState(false);
  const [favadd, setFavAdd] = useState(false);

  function handleAddToWatchLater() {
    setWatchadd(!watchadd);
    if (!watchadd) {
      notify(
        "Added to Watch Later",
        `${name} has been added to watch later`,
        "green"
      );
    } else {
      notify(
        "Removed from Watch Later",
        `${name} has been removed from watch later`,
        "red"
      );
    }
  }
  async function handleAddToFavourites() {
    setFavAdd(!favadd);
    if (!favadd) {
      notify(
        "Added to Favourites",
        `${name} has been added to favourites`,
        "green"
      );
      await moviesToLocalStorage(movie, "add", "favourites");
    } else {
      notify(
        "Removed from Favourites",
        `${name} has been removed from favourites`,
        "red"
      );
      await moviesToLocalStorage(movie, "remove", "favourites");
    }
  }
  function notify(title: string, message: string, color: string) {
    showNotification({
      autoClose: 1500,
      title,
      message,
      color,
    });
  }

  async function moviesToLocalStorage(movie: Movie, action: Action, key: Key) {
    const prevmovies = localStorage.getItem(key);
    const parsedMovies = JSON.parse(prevmovies || "[]");
    if (action == "add") {
      const isExists = parsedMovies.some((m: Movie) => m.name == movie.name);
      if (isExists) return;
      parsedMovies.push(movie);
      const newMovies = JSON.stringify(parsedMovies);
      localStorage.setItem(key, newMovies);
    } else {
      const newMovies = parsedMovies.filter((m: Movie) => m.name != movie.name);
      const newMoviesStr = JSON.stringify(newMovies);
      localStorage.setItem(key, newMoviesStr);
    }
  }

  return (
    <div className={styles.top_row}>
      <h2 className={styles.moviename}>{name}</h2>
      <div className={styles.top_btn_box}>
        <button className={styles.fav_btn} onClick={handleAddToFavourites}>
          {favadd ? (
            <AiFillStar size={20} className={styles.starfill_icon} />
          ) : (
            <AiOutlineStar size={20} className={styles.staroutline_icon} />
          )}
        </button>
        <button className={styles.add_btn} onClick={handleAddToWatchLater}>
          {watchadd ? (
            <MdDone size={20} className={styles.done_icon} />
          ) : (
            <AiOutlinePlus size={20} className={styles.plus_icon} />
          )}
        </button>
      </div>
    </div>
  );
}
interface TopRowProps {
  name: string;
  movie: Movie;
}
interface Movie {
  id: number;
  rating: number;
  name: string;
  image: string;
  type: string;
}
type Action = "add" | "remove";
type Key = "favourites" | "watchlater";

function Rating({ rating }: { rating: number }) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);

  return (
    <div className={styles.rating_container}>
      <div>
        <div className={styles.rating_top_box}>
          <img src="/movie/star.svg" />
          <span>RATING</span>
        </div>
        <h2 className={styles.rating_num}>{ratingNum}</h2>
      </div>
      {rating > 8.4 && <img src="/movie/mustwatch-stamp.png" />}
    </div>
  );
}
interface SingleMovieProps {
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
