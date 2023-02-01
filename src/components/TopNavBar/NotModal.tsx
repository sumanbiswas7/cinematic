import { useState, useEffect } from "react";
import { NotificationContent } from "../Notification/NotificationContent";
import styles from "./NotModal.module.scss";

export function NotModal({ notifications }: Props) {
  if (!notifications) return null;

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
