import moment from "moment";
import styles from "./FriendRequest.module.scss";

export function FriendRequest({ image, name, time }: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <img src={image} />
      <div>
        <p>{name}</p>
        <p>wants to be a friend</p>
        <p>{postTime}</p>
      </div>
      <div className={styles.btn_box}>
        <button>
          <img src="/notification/tick.svg" />
        </button>
        <button>
          <img src="/notification/cross.svg" />
        </button>
      </div>
    </div>
  );
}

interface Props {
  image: string;
  name: string;
  time: string;
}
