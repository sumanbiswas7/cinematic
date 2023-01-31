import moment from "moment";
import Link from "next/link";
import styles from "./Suggestion.module.scss";

export function Suggestion({ id, image, name, time, movie }: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <img src={image} />
      <Link href={`movies/${id}`} className={styles.link_container}>
        <div className={styles.info_box}>
          <p>
            {name} <span>has</span>
          </p>
          <p>suggested</p>
          <p>{movie}</p>
          <p>{postTime}</p>
        </div>
      </Link>
    </div>
  );
}

interface Props {
  id: number;
  image: string;
  name: string;
  time: string;
  movie: string;
}
