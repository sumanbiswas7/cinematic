import { useState, useEffect } from "react";
import styles from "./FriendsModal.module.scss";

export function FriendsModal({ friends }: Props) {
  if (!friends.length) return <NoFriend />;

  return (
    <div className={styles.container}>
      <p>Component</p>
    </div>
  );
}

interface Props {
  friends: string[];
}

function Friend() {
  return <div></div>;
}

function NoFriend() {
  return (
    <div className={styles.container}>
      <p className={styles.nofriend_text}>You don't have any friends 😔</p>
    </div>
  );
}
