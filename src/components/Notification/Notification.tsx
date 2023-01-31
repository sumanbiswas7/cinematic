import { userContext } from "@/pages/_app";
import { useContext } from "react";
import { FriendRequest } from "./FriendRequest";
import styles from "./Notification.module.scss";
import { Suggestion } from "./Suggestion";
import NOTIFICATIONS from "../../../data/notifications.json";

export function Notification() {
  const userctx = useContext(userContext);
  const user = userctx?.user;

  if (!user) return "";
  const notifications = userctx?.user?.notifications!;

  return (
    <div className={styles.container}>
      <div className={styles.notifications_box}>
        <p>NOTIFICATIONS</p>
        <div>{notifications.length}</div>
      </div>
      <div className={styles.notifications}>
        {NOTIFICATIONS.map((n) => {
          return <NotMsg key={n.id} notification={n} />;
        })}
      </div>
    </div>
  );
}

function NotMsg({ notification }: Props) {
  if (notification.suggestion) {
    const fromArr = notification.from.split("#");
    console.log(fromArr);
    const name = fromArr[0];
    const userId = parseInt(fromArr[1]);
    const movie = fromArr[2];
    const movieId = parseInt(fromArr[3]);

    return (
      <Suggestion
        key={movieId}
        movieId={movieId}
        userId={userId}
        image={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${name}&scale=80`}
        name={name}
        time={notification.createdAt}
        movie={movie}
      />
    );
  } else {
    const fromArr = notification.from.split("#");
    const name = fromArr[0];
    const id = parseInt(fromArr[1]);

    return (
      <FriendRequest
        id={id}
        key={notification.id}
        image={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${name}&scale=80`}
        name={name}
        time={notification.createdAt}
      />
    );
  }
}

interface Props {
  notification: {
    id: number;
    from: string;
    request: boolean;
    suggestion: boolean;
    createdAt: string;
  };
}
