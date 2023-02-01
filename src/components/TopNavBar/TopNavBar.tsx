import Link from "next/link";
import styles from "./TopNavBar.module.scss";
import { NavButton } from "./NavButton";
import { userContext } from "@/pages/_app";
import { useContext } from "react";

export function TopNavBar() {
  return (
    <div className={styles.top_bar}>
      <Link href="/" className={styles.link_cont}>
        <img src="/logo.svg" className={styles.logo_img} />
      </Link>
      {/* <NavMobileBtn /> */}
      {/* <UserImg />  */}
      <NavButton />
    </div>
  );
}
