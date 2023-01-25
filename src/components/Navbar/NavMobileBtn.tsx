import { useState } from "react";
import { ModalLink } from "./ModalLink";
import styles from "./NavMobileBtn.module.scss";
import { User } from "./User";
import { UserBtnBox } from "./UserBtnBox";

export function NavMobileBtn() {
  const [userModal, setUserModal] = useState(false);

  function handleUserClick() {
    setUserModal((p) => !p);
  }

  return (
    <div className={styles.container}>
      <button className={styles.not_btn}>
        <img src="/navbar/bell.svg" className={styles.bell_icon} />
      </button>
      <button onClick={handleUserClick} className={styles.threedot_btn}>
        <div id={userModal ? styles.active_line_1 : styles.line_1}></div>
        <div id={userModal ? styles.active_line_2 : styles.line_2}></div>
        <div id={userModal ? styles.active_line_3 : styles.line_3}></div>
      </button>
      {userModal && (
        <div className={styles.modal_user}>
          <div className={styles.top_container}>
            <User />
          </div>
          <div className={styles.mid_container}>
            <ModalLink href="/" text="Recently Added" />
            <ModalLink href="/suggestions" text="Suggestions" />
            <ModalLink href="/favourites" text="Favourites" />
            <ModalLink href="/watchlater" text="Watch Later" />
          </div>
          <div className={styles.bottom_container}>
            <UserBtnBox />
          </div>
        </div>
      )}
    </div>
  );
}
