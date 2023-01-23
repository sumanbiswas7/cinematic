import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.scss";
import { Notification } from "../Notification/Notification";
import Image from "next/image";

export function NavBar() {
  const route = useRouter().route;

  return (
    <nav className={styles.container}>
      <div className={styles.logo_container}>
        <img src="/logo.svg" />
      </div>

      <ul>
        <Link className={styles.link_con} href="/">
          <li className={getLinkClassName("/", route)}>Recent Movies</li>
        </Link>
        <Link className={styles.link_con} href="/suggestions">
          <li className={getLinkClassName("/suggestions", route)}>
            Suggestions
          </li>
        </Link>
        <Link className={styles.link_con} href="/favourites">
          <li className={getLinkClassName("/favourites", route)}>Favourites</li>
        </Link>
        <Link className={styles.link_con} href="/watchlater">
          <li className={getLinkClassName("/watchlater", route)}>
            Watch Later
          </li>
        </Link>
      </ul>
      <Notification />
    </nav>
  );
}

function getLinkClassName(match: string, route: string) {
  if (route === match) return `${styles.link} ${styles.active}`;
  else return styles.link;
}
