import styles from "./SingleMovie.module.scss";
const movie = {
  id: 8,
  name: "Inception",
  rating: 8.5,
  type: "Science Fiction",
  image:
    "https://movizine-imageupload.s3.ap-south-1.amazonaws.com/poster_inception.jpg",
  description:
    "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
};

export function SingleMovie() {
  return (
    <div className={styles.container}>
      <div className={styles.left_box}>
        <img src={movie.image} className={styles.movie_img} />
        <img src="/movie/btm-shape.svg" className={styles.btm_shape} />
        <div className={styles.textcontent}>
          <RatingBox rating={movie.rating} />
          <h2>{movie.name}</h2>
          <p>{movie.description}</p>
        </div>
      </div>
      <div className={styles.right_box}></div>
    </div>
  );
}

export function RatingBox({ rating }: { rating: number }) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);

  return (
    <div className={styles.rating_box}>
      <div className={styles.box_1}>
        <img src="/movie/movie-icon.svg" />
      </div>
      <div className={styles.box_2}>{movie.rating}</div>
    </div>
  );
}
