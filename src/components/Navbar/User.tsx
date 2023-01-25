import styles from "./User.module.scss";

export function User() {
  return (
    <img
      className={styles.userimg}
      src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Leo&scale=80"
    />
  );
}
