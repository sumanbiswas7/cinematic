import Link from "next/link";
import { useState } from "react";
import { FriendRequest } from "../Notification/FriendRequest";
import { Suggestion } from "../Notification/Suggestion";
import { ModalLink } from "./ModalLink";
import styles from "./NavMobileBtn.module.scss";
import { UserBtnBox } from "./UserBtnBox";

export function NavMobileBtn() {
  const [userModal, setUserModal] = useState(false);
  const [notModal, setNotModal] = useState(false);

  function handleUserClick() {
    setNotModal(false);
    setUserModal((p) => !p);
  }

  function handleNotClick() {
    setUserModal(false);
    setNotModal((p) => !p);
  }

  return (
    <div className={styles.container}>
      <button className={styles.not_btn} onClick={handleNotClick}>
        <img src="/navbar/bell.svg" className={styles.bell_icon} />
      </button>
      <button onClick={handleUserClick} className={styles.threedot_btn}>
        <div id={userModal ? styles.active_line_1 : styles.line_1}></div>
        <div id={userModal ? styles.active_line_2 : styles.line_2}></div>
        <div id={userModal ? styles.active_line_3 : styles.line_3}></div>
      </button>

      {userModal && (
        <div className={styles.modal}>
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

      {notModal && (
        <div className={styles.modal}>
          <div className={styles.notifications_box}>
            <p>NOTIFICATIONS</p>
            <div>{2}</div>
          </div>
          <div className={styles.not_scroll_box}>
            <FriendRequest
              image="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Scooter&scale=80"
              name="John Milner"
              time="January 23rd 2023, 3:16:59 pm"
            />
            <Suggestion
              image="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=suman&scale=80"
              name="John Milner"
              time="January 23rd 2023, 3:16:59 pm"
              movie="Django Unchained"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function User() {
  return (
    <Link href={"/"}>
      <img
        className={styles.userimg}
        src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Leo&scale=80"
      />
    </Link>
  );
}
