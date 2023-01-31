import Link from "next/link";
import styles from "./UserMovie.module.scss";

export function UserMovie({ id, image, name, rating, type }: MovieProps) {
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
