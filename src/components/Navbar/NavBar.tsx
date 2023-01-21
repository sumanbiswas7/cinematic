import styles from "./NavBar.module.scss";

export function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.logo_container}>
        <img src="./logo.svg" />
      </div>
    </nav>
  );
}
