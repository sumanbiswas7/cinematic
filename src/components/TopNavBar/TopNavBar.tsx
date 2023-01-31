import { userContext } from "@/pages/_app";
import Link from "next/link";
import styles from "./TopNavBar.module.scss";
import { useContext } from "react";
import { NavMobileBtn } from "../Navbar/NavMobileBtn";
import { avatarStyle } from "@/constants/diceBearStyle";
import { NavButton } from "./NavButton";

export function TopNavBar() {
  return (
    <div className={styles.top_bar}>
      <Link href="/" className={styles.link_cont}>
        <img src="/logo.svg" className={styles.logo_img} />
      </Link>
      {/* <NavMobileBtn />
      <UserImg /> */}
      <NavButton />
    </div>
  );
}

function UserImg() {
  const userctx = useContext(userContext);
  const user = userctx?.user;
  const url = user?.name
    ? `https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${user.name}&scale=80`
    : "/navbar/blank_profile.jpg";

  return (
    <Link href={"/profile"}>
      <img className={styles.userimg} src={url} />
    </Link>
  );
}
