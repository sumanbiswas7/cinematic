import styles from "./SingleMovie.module.scss";
import { RatingBox } from "./RatingBox";
import { Tags } from "./Tags";

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
      <div className={`${styles.left_card} ${styles.card}`}>
        <img src={movie.image} className={styles.movie_img} />
        <div className={styles.btm_shape}>
          <div className={styles.textcontent}>
            <RatingBox rating={movie.rating} />
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>

      <div className={`${styles.right_card} ${styles.card}`}>
        <h2>{movie.name}</h2>
        <p className={styles.title}>DIRECTOR</p>
        <p className={styles.text}>Cristopher Nolan</p>
        <p className={styles.title}>CASTS</p>
        <Tags data={["Matthew McConaughey", "Jessica Chastain"]} />
        <p className={styles.title}>TYPE</p>
        <Tags data={["Action", "Adventure"]} />
        <p className={styles.title}>RELEASE YEAR</p>
        <h2 className={styles.release_year}>2015</h2>
        {/* <div className={styles.btm_box}></div> */}
      </div>
    </div>
  );
}
