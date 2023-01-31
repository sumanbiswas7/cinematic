import React, { useState, useEffect, useContext } from "react";
import styles from "./MainContent.module.scss";
import { Loader as CLoader } from "../components/Loader/Loader";
import Link from "next/link";
import { NavMobileBtn } from "@/components/Navbar/NavMobileBtn";
import { userContext } from "@/pages/_app";
import { app } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useLazyQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/userQueries";
import { avatarStyle } from "@/constants/diceBearStyle";

export function MainContent({ children, isLoading, title }: Props) {
  const [loading, setLoading] = useState(true);
  const [getAuthUser] = useLazyQuery(GET_AUTH_USER);
  const userctx = useContext(userContext);

  useEffect(() => {
    handleGetAuthUser();
    if (isLoading) setLoading(true);
    else setLoading(false);
  }, [isLoading]);

  function handleGetAuthUser() {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const firstload = userctx?.user;
        const setUser = userctx?.setUser!;

        if (!firstload) {
          getAuthUser({
            variables: { email: user.email },
            onCompleted: (data) => setUser(data.get_authuser),
          });
        }
      } else {
      }
    });
  }

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
    ? `https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${user.name}&scale=80`
    : "/navbar/blank_profile.jpg";

  return (
    <Link href={"/profile"}>
      <img className={styles.userimg} src={url} />
    </Link>
  );
}
