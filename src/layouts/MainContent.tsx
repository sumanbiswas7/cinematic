import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.scss";
import { Loader as CLoader } from "../components/Loader/Loader";
import Link from "next/link";
import { NavMobileBtn } from "@/components/Navbar/NavMobileBtn";

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
