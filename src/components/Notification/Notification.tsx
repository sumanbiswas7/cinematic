import { userContext } from "@/pages/_app";
import { useContext } from "react";
import styles from "./Notification.module.scss";
import { NotificationContent } from "./NotificationContent";

export function Notification() {
  const userctx = useContext(userContext);
  const user = userctx?.user;

  if (!user) return null;
  const notifications = userctx?.user?.notifications!;

  return (
    <div className={styles.container}>
      <div className={styles.notifications_box}>
        <p>NOTIFICATIONS</p>
        <div>{notifications.length}</div>
      </div>
      <div className={styles.notifications}>
        {notifications.map((n) => {
          return <NotificationContent key={n.id} notification={n} />;
        })}
      </div>
    </div>
  );
}
