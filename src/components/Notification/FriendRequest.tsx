import { useState, useContext, useEffect } from "react";
import moment from "moment";
import styles from "./FriendRequest.module.scss";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import {
  ACCEPT_REQUEST,
  DELETE_NOTIFICATION,
} from "@/graphql/mutations/notificationMutations";
import { userContext } from "@/pages/_app";

export function FriendRequest({ id, image, name, time, fromId }: Props) {
  const postTime = moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow();
  const userctx = useContext(userContext);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    // Keeping request accepted if already a friend
    const user = userctx?.user;
    const from = `${name}#${fromId}`;
    const existingFriends = user?.friends;
    if (existingFriends?.includes(from)) setAccepted(true);
  }, []);

  async function handleTickClick() {
    setAccepted(true);
    const user = userctx?.user;
    const setUser = userctx?.setUser!;
    const authuserId = userctx?.user?.id;
    const from = `${name}#${fromId}`;
    const request = {
      from,
      userId: authuserId,
    };

    // Checking if friend exists already
    const existingFriends = user?.friends;
    if (existingFriends?.includes(from)) return;

    // Performing database mutations
    acceptRequest({ variables: { request } });
    deleteNotification({ variables: { notId: id } });

    // Changing local states
    const newFriends = [...(user?.friends || []), from];
    const newUser: any = Object.assign({}, userctx?.user, {
      friends: newFriends,
    });
    setUser(newUser);
  }

  function handleCancelClick() {
    setRejected(true);
  }

  if (accepted) {
    return <AcceptedRequest id={id} image={image} name={name} key={id} />;
  }
  if (rejected) {
    return <RejectedRequest id={id} image={image} name={name} key={id} />;
  }

  return (
    <div className={styles.container}>
      <img src={image} />

      <div className={styles.info_box}>
        <Link href={`/users/${id}`} className={styles.next_link}>
          <p className={styles.name}>{name}</p>
        </Link>
        <p>wants to be a friend</p>
        <p>{postTime}</p>
      </div>

      <div className={styles.btn_box}>
        <button onClick={handleTickClick}>
          <img src="/notification/tick.svg" />
        </button>
        <button onClick={handleCancelClick}>
          <img src="/notification/cross.svg" />
        </button>
      </div>
    </div>
  );
}

interface Props {
  id: number;
  image: string;
  name: string;
  time: string;
  fromId: number;
}

function AcceptedRequest({ id, name, image }: AcceptedRequestProps) {
  return (
    <div className={styles.container}>
      <img src={image} />

      <div className={styles.info_box}>
        <Link href={`/users/${id}`} className={styles.next_link}>
          <p className={styles.name}>{name}</p>
        </Link>
        <p>and you are now friends</p>
      </div>
    </div>
  );
}

interface AcceptedRequestProps {
  id: number;
  name: string;
  image: string;
}

function RejectedRequest({ id, name, image }: RejectedRequestProps) {
  return (
    <div className={styles.container}>
      <img src={image} />

      <div className={styles.info_box}>
        <Link href={`/users/${id}`} className={styles.next_link}>
          <p className={styles.name}>{name}</p>
        </Link>
        <p>Friend request rejected</p>
      </div>
    </div>
  );
}

interface RejectedRequestProps {
  id: number;
  name: string;
  image: string;
}
