import styles from "./RatingBox.module.scss";

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

export function RatingBox({ rating }: { rating: number }) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);

  return (
    <div className={styles.rating_box}>
      <div className={`${styles.box_1} ${styles.box}`}>
        <img src="/movie/movie-icon.svg" />
      </div>
      <div className={`${styles.box_2} ${styles.box}`}>
        <span>{ratingNum}</span>
      </div>
    </div>
  );
}
