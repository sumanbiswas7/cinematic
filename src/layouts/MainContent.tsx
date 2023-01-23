import React, { useState, useEffect } from "react";
import styles from "./MainContent.module.scss";
import { Loader as CLoader } from "../components/Loader/Loader";

export function MainContent({ children, isLoading }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) setLoading(true);
    else setLoading(false);
  }, [isLoading]);

  return (
    <main className={styles.main}>
      <div className={styles.top_bar}></div>

      <div className={styles.main_content}>
        {loading ? <CLoader /> : children}
      </div>
    </main>
  );
}

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}
