import { useState } from "react";
import moment from "moment";
import styles from "./FriendRequest.module.scss";
import Link from "next/link";

export function FriendRequest({ id, image, name, time }: Props) {
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
      <Link href={`/users/${id}`} className={styles.link_container}>
        {accepted ? (
          <div className={styles.info_box}>
            <p>{name}</p>
            <p>and you are now friends</p>
          </div>
        ) : (
          <div className={styles.info_box}>
            <p>{name}</p>
            <p>wants to be a friend</p>
            <p>{postTime}</p>
          </div>
        )}
      </Link>
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
  id: number;
  image: string;
  name: string;
  time: string;
}
