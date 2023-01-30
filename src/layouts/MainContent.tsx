import React, { useState, useEffect, useContext } from "react";
import styles from "./MainContent.module.scss";
import { Loader as CLoader } from "../components/Loader/Loader";
import Link from "next/link";
import { NavMobileBtn } from "@/components/Navbar/NavMobileBtn";
import { userContext } from "@/pages/_app";

export function MainContent({ children, isLoading, title }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) setLoading(true);
    else setLoading(false);
  }, [isLoading]);

  return (
    <main className={styles.main}>
      <div className={styles.top_bar}>
        <Link href="/" className={styles.link_cont}>
          <img src="/logo.svg" className={styles.logo_img} />
        </Link>
        <NavMobileBtn />
        <UserImg />
      </div>
      {!isLoading && <h2 className={styles.title}>{title}</h2>}
      {loading ? <CLoader /> : children}
    </main>
  );
}

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  title?: string;
}

function UserImg() {
  const userctx = useContext(userContext);
  const user = userctx?.user;
  const url = user?.name
    ? `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.name}&scale=80`
    : "/navbar/blank_profile.jpg";

  return (
    <Link href={"/profile"}>
      <img className={styles.userimg} src={url} />
    </Link>
  );
}
