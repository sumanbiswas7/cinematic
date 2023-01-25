import moment from "moment";
import styles from "./Suggestion.module.scss";

export function Suggestion({ image, name, time, movie }: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <img src={image} />
      <div>
        <p>
          {name} <span>has</span>
        </p>
        <p>suggested</p>
        <p>{movie}</p>
        <p>{postTime}</p>
      </div>
    </div>
  );
}

interface Props {
  image: string;
  name: string;
  time: string;
  movie: string;
}
