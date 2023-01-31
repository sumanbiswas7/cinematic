import { UserType } from "@/pages/_app";
import moment from "moment";
import styles from "./User.module.scss";
import { UserMovie } from "./UserMovie";

export function User({ user }: Props) {
  const joined = moment(user?.createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow();

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <img
          className={styles.userimg}
          src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user?.name}&scale=80`}
        />
        <h2 className={styles.name}>{user?.name}</h2>
        {user?.country && (
          <p className={styles.country}>Country: {user.country}</p>
        )}
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

interface Props {
  user: UserType;
}
