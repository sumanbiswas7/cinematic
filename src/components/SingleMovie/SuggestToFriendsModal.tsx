import { userContext } from "@/pages/_app";
import { useState, useEffect, useContext } from "react";
import styles from "./SuggestToFriendsModal.module.scss";

export function SuggestToFriendsModal({ onClose }: Props) {
  function handleOutsideClick() {
    onClose();
  }

  return (
    <div className={styles.main_container}>
      <div onClick={handleOutsideClick} className={styles.container}>
        <p>Component</p>
      </div>
      <div onClick={() => alert("mid")} className={styles.mid_container}></div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}
