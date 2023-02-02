import { useState, useContext } from "react";
import styles from "./NavButton.module.scss";
import { NavModal } from "./NavModal";
import { AiFillBell } from "react-icons/ai";
import { userContext } from "@/pages/_app";
import { NotModal } from "./NotModal";
import { FriendsModal } from "./FriendsModal";

export function NavButton() {
  const [modal, setModal] = useState(false);
  const [notmodal, setNotmodal] = useState(false);
  const [frnsmodal, setFrnsModal] = useState(false);
  const userctx = useContext(userContext);
  const notifications = userctx?.user?.notifications;

  function handleModalChange() {
    setFrnsModal(false);
    setNotmodal(false);
    setModal(!modal);
  }
  function handleNotModalChange() {
    setFrnsModal(false);
    setModal(false);
    setNotmodal(!notmodal);
  }
  function handleFriendsModalClick() {
    setModal(false);
    setNotmodal(false);
    setFrnsModal(!frnsmodal);
  }

  return (
    <div className={styles.container}>
      <button className={styles.not_btn} onClick={handleNotModalChange}>
        <AiFillBell size={22} className={styles.bell_icon} />
        {notifications && notifications.length != 0 && (
          <span className={styles.not_count}>{notifications?.length}</span>
        )}
      </button>
      {notmodal && <NotModal notifications={notifications!} />}

      <button onClick={handleModalChange} className={styles.navbtn}>
        <div id={modal ? styles.active_line_1 : styles.line_1}></div>
        <div id={modal ? styles.active_line_2 : styles.line_2}></div>
        <div id={modal ? styles.active_line_3 : styles.line_3}></div>
      </button>
      {modal && <NavModal onFrndsModal={handleFriendsModalClick} />}
      {frnsmodal && <FriendsModal />}
    </div>
  );
}
