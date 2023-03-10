import styles from "./SingleMovie.module.scss";
import { RatingBox } from "./RatingBox";
import { Tags } from "./Tags";
import { AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { BsShare, BsShareFill } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { showNotification } from "@mantine/notifications";
import { avatarStyle } from "@/constants/diceBearStyle";
import Link from "next/link";
import moment from "moment";
import { userContext } from "@/pages/_app";
import { SuggestToFriendsModal } from "./SuggestToFriendsModal";

export function SingleMovie({
  director,
  release,
  rating,
  name,
  description,
  image,
  type,
  casts,
  id,
  user,
  createdAt,
}: SingleMovieProps) {
  const time = moment(createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow();
  const castsArr = casts.split("#");
  const typesArr = type.split("#");

  const movie = {
    id,
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
          <Tags data={castsArr} />
          <p className={styles.title}>TYPE</p>
          <Tags data={typesArr} />
        </div>
        <BottomRow
          release={release}
          name={user.name}
          userId={user.id}
          time={time}
        />
        <div className={styles.btm_box}>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
}

function TopRow({ name, movie }: TopRowProps) {
  const [modal, setModal] = useState(false);
  const [suggestModal, setSuggestModal] = useState(false);

  function handleMoreClick() {
    setModal(!modal);
  }

  function handleSuggestModal() {
    setSuggestModal(!suggestModal);
  }

  function handleCloseSuggestModal() {
    setSuggestModal(false);
  }

  return (
    <div className={styles.top_row}>
      <h2 className={styles.moviename}>{name}</h2>
      <button onClick={handleMoreClick} className={styles.threedot}>
        <FiMoreVertical className={styles.threedot_icon} />
        {modal && (
          <MoreModal
            movie={movie}
            key={movie.id}
            onSuggestClick={handleSuggestModal}
          />
        )}
      </button>
      {suggestModal && (
        <SuggestToFriendsModal
          movie={movie}
          onClose={handleCloseSuggestModal}
        />
      )}
    </div>
  );
}

function MoreModal({ movie, onSuggestClick }: MoreModalProps) {
  const [watchadd, setWatchadd] = useState(false);
  const [favadd, setFavAdd] = useState(false);

  useEffect(() => {
    handleFirstLoad();
  }, []);

  function handleFirstLoad() {
    const wmovies = localStorage.getItem("watchlater");
    const fmovies = localStorage.getItem("favourites");
    if (wmovies) {
      const parsed = JSON.parse(wmovies);
      const isExists = parsed.some((m: Movie) => m.name == movie.name);
      if (isExists) setWatchadd(true);
    }
    if (fmovies) {
      const parsed = JSON.parse(fmovies);
      const isExists = parsed.some((m: Movie) => m.name == movie.name);
      if (isExists) setFavAdd(true);
    }
  }

  async function handleAddToWatchLater() {
    setWatchadd(!watchadd);
    if (!watchadd) {
      notify(
        "Added to Watch Later",
        `${name} has been added to watch later`,
        "green"
      );
      await moviesToLocalStorage(movie, "add", "watchlater");
    } else {
      notify(
        "Removed from Watch Later",
        `${name} has been removed from watch later`,
        "red"
      );
      await moviesToLocalStorage(movie, "remove", "watchlater");
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

  function handleSuggestModalClick() {
    onSuggestClick();
  }

  return (
    <div className={styles.more_container}>
      <button className={styles.btn_box} onClick={handleAddToFavourites}>
        {favadd ? (
          <AiFillStar size={18} className={styles.starfill_icon} />
        ) : (
          <AiOutlineStar size={18} className={styles.staroutline_icon} />
        )}
        <span className={styles.text}>Favourites</span>
      </button>
      <button className={styles.btn_box} onClick={handleAddToWatchLater}>
        {watchadd ? (
          <MdDone size={18} className={styles.done_icon} />
        ) : (
          <AiOutlinePlus size={18} className={styles.plus_icon} />
        )}
        <span className={styles.text}>Watch Later</span>
      </button>
      <button className={styles.btn_box} onClick={handleSuggestModalClick}>
        <BsShareFill size={14} className={styles.share_icon} />
        <span className={styles.text}>Suggest</span>
      </button>
    </div>
  );
}
interface MoreModalProps {
  movie: Movie;
  onSuggestClick: () => void;
}

function BottomRow({ release, name, time, userId }: BottomRowProps) {
  return (
    <div className={styles.btm_row_container}>
      <div>
        <p className={styles.title}>RELEASE YEAR</p>
        <h2 className={styles.release_year}>{release}</h2>
      </div>
      <div>
        <p className={styles.title}>POSTED BY</p>
        <Link href={`/users/${userId}`} className={styles.next_link}>
          <div className={styles.user_box}>
            <img
              className={styles.userimg}
              src={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`}
            />
            <div className={styles.user_box_content}>
              <p className={styles.name}>{name}</p>
              <p className={styles.time}>{time}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface BottomRowProps {
  userId: number;
  name: string;
  release: string;
  time: string;
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
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}
