import { avatarStyle } from "@/constants/diceBearStyle";
import { SEND_SUGGESTION } from "@/graphql/mutations/notificationMutations";
import { userContext } from "@/pages/_app";
import { useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useContext } from "react";
import styles from "./SuggestToFriendsModal.module.scss";

export function SuggestToFriendsModal({ onClose, movie }: Props) {
  const userctx = useContext(userContext);
  const friends = userctx?.user?.friends;

  function handleOutsideClick() {
    onClose();
  }

  return (
    <div className={styles.main_container}>
      <div onClick={handleOutsideClick} className={styles.container}></div>
      <div className={styles.mid_container}>
        {friends?.length ? (
          friends.map((f) => <Friend movie={movie} friend={f} key={f} />)
        ) : (
          <p className={styles.no_firends}>
            You don&apos;t have any friends to suggest movie
          </p>
        )}
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
  movie: Movie;
}
interface Movie {
  id: number;
  rating: number;
  name: string;
  image: string;
  type: string;
}

function Friend({ friend, movie }: FriendProps) {
  const userctx = useContext(userContext);
  const user = userctx?.user;
  const friendArr = friend.split("#");
  const [sendSuggestion] = useMutation(SEND_SUGGESTION);

  async function handleSendSuggestion() {
    showNotification({
      autoClose: 1500,
      title: `Movie Suggested`,
      message: `Suggested ${movie.name} to your friend ${friendArr[0]}`,
      color: "cyan",
    });
    const from = `${user?.name}#${user?.id}#${movie.name}#${movie.id}`;
    sendSuggestion({
      variables: {
        suggestion: {
          from,
          userId: parseInt(friendArr[1]),
        },
      },
    });
  }

  return (
    <div className={styles.friend_box} onClick={handleSendSuggestion}>
      <img
        className={styles.userimg}
        src={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${friendArr[0]}&scale=80`}
      />
      <p className={styles.name}>{friendArr[0]}</p>
    </div>
  );
}

interface FriendProps {
  friend: string;
  movie: Movie;
}
