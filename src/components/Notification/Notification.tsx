import { useState, useEffect } from "react";
import { FriendRequest } from "./FriendRequest";
import styles from "./Notification.module.scss";
import { Suggestion } from "./Suggestion";

export function Notification() {
  return (
    <div className={styles.container}>
      <div className={styles.notifications_box}>
        <p>NOTIFICATIONS</p>
        <div>{2}</div>
      </div>
      <div className={styles.notifications}>
        <FriendRequest
          image="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Scooter&scale=80"
          name="John Milner"
          time="January 23rd 2023, 3:16:59 pm"
        />
        <Suggestion
          image="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=suman&scale=80"
          name="John Milner"
          time="January 23rd 2023, 3:16:59 pm"
          movie="Django Unchained"
        />
      </div>
    </div>
  );
}
