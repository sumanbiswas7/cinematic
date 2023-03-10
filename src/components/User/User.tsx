import { avatarStyle } from "@/constants/diceBearStyle";
import { userContext, UserType } from "@/pages/_app";
import moment from "moment";
import styles from "./User.module.scss";
import { UserMovie } from "./UserMovie";
import { useContext } from "react";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SEND_REQUEST } from "@/graphql/mutations/notificationMutations";

export function User({ user }: Props) {
  const joined = moment(user?.createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <img
          className={styles.userimg}
          src={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${user?.name}&scale=80`}
        />
        <h2 className={styles.name}>{user?.name}</h2>
        <MidContent
          country={user?.country}
          username={user?.name}
          userId={user?.id}
        />
        <p className={styles.joined}>Joined {joined}</p>
      </div>
      <p className={styles.movies_count}>Movies: {user?.movies.length}</p>
      <div className={styles.movies_container}>
        {user?.movies.map((movie: any) => {
          return (
            <UserMovie
              id={movie.id}
              key={movie.id}
              image={movie.image}
              name={movie.name}
              rating={movie.rating}
              type={movie.type}
            />
          );
        })}
      </div>
    </div>
  );
}

function MidContent({ country, username, userId }: MidContentProps) {
  const userctx = useContext(userContext);
  const authusername = userctx?.user?.name;
  const [sendRequest] = useMutation(SEND_REQUEST);

  async function handleAddFriend() {
    if (!authusername) {
      return notify(
        "Please Login or Signup",
        "You must create an account or login to your older one to send a friend request",
        "orange"
      );
    }
    if (userctx.user?.friends.includes(`${username}#${userId}`)) {
      return notify(
        "Already Friends",
        `You and ${username} are already friends`,
        "orange"
      );
    }
    const request = {
      from: `${authusername}#${userctx.user?.id}`,
      userId,
    };
    sendRequest({ variables: { request } });
    return notify("Request Sent", "Friend request sent successfully", "green");
  }

  function notify(title: string, message: string, color: string) {
    showNotification({
      autoClose: 1500,
      title,
      message,
      color,
    });
  }

  return (
    <div className={styles.mid_container}>
      <Friend />
      {country && <div className={styles.country_box}>{country}</div>}
    </div>
  );

  function Friend() {
    // USER DOESN'T EXISTS
    const route = useRouter().route;
    if (route.includes("/profile")) return null;

    const isFriend = userctx?.user?.friends.includes(`${username}#${userId}`)
      ? true
      : false;

    const isOwner = userctx?.user?.name == username ? true : false;

    // USER EXISTS
    if (isFriend) {
      return <button className={styles.add_firend_btn}>Friends</button>;
    }
    if (isOwner) {
      return null;
    }

    return (
      <button onClick={handleAddFriend} className={styles.add_firend_btn}>
        Add Friend
      </button>
    );
  }
}

interface Props {
  user: UserType;
}
interface MidContentProps {
  userId: number;
  country?: string;
  username: string;
}
