import { FriendRequest } from "./FriendRequest";
import { Suggestion } from "./Suggestion";
import styles from "./NotificationContent.module.scss";
import { avatarStyle } from "@/constants/diceBearStyle";

export function NotificationContent({ notification }: Props) {
  // Notification is a Suggestion
  if (notification.suggestion) {
    const fromArr = notification.from.split("#");
    const name = fromArr[0];
    const userId = parseInt(fromArr[1]);
    const movie = fromArr[2];
    const movieId = parseInt(fromArr[3]);

    return (
      <Suggestion
        key={movieId}
        movieId={movieId}
        userId={userId}
        image={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`}
        name={name}
        time={notification.createdAt}
        movie={movie}
      />
    );
  }
  // Notification is a Friend Request
  else {
    const fromArr = notification.from.split("#");
    const name = fromArr[0];
    const id = parseInt(fromArr[1]);

    return (
      <FriendRequest
        id={id}
        key={notification.id}
        image={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`}
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
