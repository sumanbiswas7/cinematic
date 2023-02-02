import Link from "next/link";
import styles from "./TopNavBar.module.scss";
import { NavButton } from "./NavButton";

export function TopNavBar() {
  return (
    <div className={styles.top_bar}>
      <Link href="/" className={styles.link_cont}>
        <img src="/logo.svg" className={styles.logo_img} />
      </Link>
      <NavButton />
    </div>
  );
}
