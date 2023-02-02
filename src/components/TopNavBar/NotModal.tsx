import { NotificationContent } from "../Notification/NotificationContent";
import styles from "./NotModal.module.scss";

export function NotModal({ notifications }: Props) {
  if (!notifications) return <NoNotification />;
  if (!notifications.length) return <NoNotification />;

  return (
    <div className={styles.container}>
      {notifications.map((n) => {
        return <NotificationContent key={n.id} notification={n} />;
      })}
    </div>
  );
}

interface Props {
  notifications: {
    id: number;
    from: string;
    request: boolean;
    suggestion: boolean;
    createdAt: string;
  }[];
}

function NoNotification() {
  return (
    <div className={styles.container}>
      <p className={styles.no_not_msg}>You don&apos;t have any notification</p>
    </div>
  );
}
