import { useState } from "react";
import moment from "moment";
import styles from "./FriendRequest.module.scss";

export function FriendRequest({ image, name, time }: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();
  const [accepted, setAccepted] = useState(false);

  function handleTickClick() {
    setAccepted(true);
  }
  function handleCancelClick() {
    setAccepted(false);
  }

  return (
    <div className={styles.container}>
      <img src={image} />
      {accepted ? (
        <div>
          <p>{name}</p>
          <p>and you are now friends</p>
        </div>
      ) : (
        <div>
          <p>{name}</p>
          <p>wants to be a friend</p>
          <p>{postTime}</p>
        </div>
      )}
      {!accepted && (
        <>
          <div className={styles.btn_box}>
            <button onClick={handleTickClick}>
              <img src="/notification/tick.svg" />
            </button>
            <button onClick={handleCancelClick}>
              <img src="/notification/cross.svg" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  image: string;
  name: string;
  time: string;
}
