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
      <button onClick={handleModalChange} className={styles.navbtn}></button>
      {modal && <NavModal />}
    </div>
  );
}
