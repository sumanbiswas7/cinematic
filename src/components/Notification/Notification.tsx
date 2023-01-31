import { userContext } from "@/pages/_app";
import { useContext } from "react";
import { FriendRequest } from "./FriendRequest";
import styles from "./Notification.module.scss";
import { Suggestion } from "./Suggestion";
import NOTIFICATIONS from "../../../data/notifications.json";
import moment from "moment";

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
    const name = fromArr[0];
    const movie = fromArr[1];
    const id = fromArr[2];

    return (
      <Suggestion
        key={id}
        image={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${name}&scale=80`}
        name={name}
        time={notification.createdAt}
        movie={movie}
      />
    );
  } else {
    return (
      <FriendRequest
        key={notification.id}
        image={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${notification.from}&scale=80`}
        name={notification.from}
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
