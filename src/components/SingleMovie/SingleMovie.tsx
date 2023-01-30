import styles from "./SingleMovie.module.scss";
import { RatingBox } from "./RatingBox";
import { Tags } from "./Tags";

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
          <h2>{name}</h2>
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
