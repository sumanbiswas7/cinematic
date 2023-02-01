import { useState, useEffect } from "react";
import styles from "./NavButton.module.scss";
import { NavModal } from "./NavModal";

export function NavButton() {
  const [modal, setModal] = useState(false);

  function handleModalChange() {
    setModal(!modal);
  }

  return (
    <div className={styles.container}>
      <button onClick={handleModalChange} className={styles.navbtn}>
        <div id={modal ? styles.active_line_1 : styles.line_1}></div>
        <div id={modal ? styles.active_line_2 : styles.line_2}></div>
        <div id={modal ? styles.active_line_3 : styles.line_3}></div>
      </button>
      {modal && <NavModal />}
    </div>
  );
}
