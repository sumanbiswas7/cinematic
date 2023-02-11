import Link from "next/link";
import styles from "./Movie.module.scss";

export function Movie({ imageUrl, name, type, rating, id }: Props) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);
  const ratingColor = setRatingColor(rating);
  const movieName = getMovieName(name);
  const typeArr = type.split("#");
  return (
    <div className={styles.container}>
      <Link href={`/movies/${id}`}>
        <img className={styles.movieimg} src={imageUrl} />
      </Link>

      <div className={styles.bottom_container}>
        <div>
          <p className={styles.name}>{movieName}</p>
          <p className={styles.type}>{typeArr[0]}</p>
        </div>
        <span style={{ backgroundColor: ratingColor }}>{ratingNum}</span>
      </div>
    </div>
  );
}

function setRatingColor(rating: number) {
  if (rating > 7.5) return "#277B44";
  else if (rating > 6) return "#B88A1F";
  else return "#BC4838";
}
function getMovieName(name: string) {
  const resName = name.substring(0, 14);
  if (name.length > 14) return resName + "...";
  else return resName;
}

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  rating: number;
  type: string;
}
