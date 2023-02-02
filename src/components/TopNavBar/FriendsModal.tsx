import { avatarStyle } from "@/constants/diceBearStyle";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./FriendsModal.module.scss";

export function FriendsModal({ friends }: Props) {
  if (!friends.length) return <NoFriend />;

  return (
    <div className={styles.container}>
      {friends.map((f) => {
        return <Friend friend={f} />;
      })}
    </div>
  );
}

interface Props {
  friends: string[];
}

function Friend({ friend }: FriendProps) {
  const data = friend.split("#");
  const name = data[0] || "";
  const id = data[1] || 2;

  return (
    <Link href={`/users/${id}`} className={styles.nextlink}>
      <div className={styles.friend_box}>
        <img
          className={styles.friend_img}
          src={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`}
        />
        <p className={styles.friend_name}>{name}</p>
      </div>
    </Link>
  );
}
interface FriendProps {
  friend: string;
}

function NoFriend() {
  return (
    <div className={styles.container}>
      <p className={styles.nofriend_text}>
        Sorry You don't have any friends 😔
      </p>
    </div>
  );
}
