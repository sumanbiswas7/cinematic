import moment from "moment";
import Link from "next/link";
import styles from "./Suggestion.module.scss";

export function Suggestion({
  userId,
  movieId,
  image,
  name,
  time,
  movie,
}: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <img src={image} />
      <div className={styles.info_box}>
        <p>
          <Link href={`users/${userId}`} className={styles.link_container}>
            {name}
          </Link>
          <span> has</span>
        </p>
        <p>suggested</p>
        <Link href={`movies/${movieId}`} className={styles.link_container}>
          <p>{movie}</p>
        </Link>
        <p>{postTime}</p>
      </div>
    </div>
  );
}

interface Props {
  movieId: number;
  userId: number;
  image: string;
  name: string;
  time: string;
  movie: string;
}
