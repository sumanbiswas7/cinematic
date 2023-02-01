import { avatarStyle } from "@/constants/diceBearStyle";
import Link from "next/link";
import React, { useState, useContext } from "react";
import styles from "./NavModal.module.scss";
import {
  AiFillInfoCircle,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineRight,
} from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";
import { Loader } from "@mantine/core";

export function NavModal() {
  const userctx = useContext(userContext);
  const user = userctx?.user;

  return (
    <div className={styles.container}>
      <User name={user?.name} />
      <ReportIssue />
      <div className={styles.mid_content}>
        <NavLink title="Recently Added" href="/" />
        <NavLink title="Suggestions" href="/suggestions" />
        <NavLink title="Favourites" href="/favourites" />
        <NavLink title="Watch Later" href="/watchlater" />
      </div>
      {user && (
        <div className={styles.btm_content}>
          <NavIconLink
            icon={<AiOutlinePlus fill="#B9B9B9" />}
            title="New Movie"
            href="/"
          />
          <NavIconLink
            icon={<HiUserGroup fill="#B9B9B9" />}
            title="Friends"
            href="/"
          />
          <LogOutBtn />
        </div>
      )}
    </div>
  );
}

function User({ name }: UserProps) {
  const imgSrc = name
    ? `https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`
    : "/navbar/blank_profile.jpg";

  const userName = name ? (
    <>
      <h2 className={styles.user_name}>{name}</h2>
      <p className={styles.user_btm_text}>See your profile</p>
    </>
  ) : (
    <>
      <Link href={"/auth/signup"} className={styles.link}>
        <h2 className={styles.user_name}>Sign Up</h2>
      </Link>
      <Link href={"/auth/login"} className={styles.link}>
        <p className={styles.user_btm_text}>
          Have an existing account? <span>Log In</span> here
        </p>
      </Link>
    </>
  );

  return (
    <Link href={`/profile`} className={styles.link}>
      <div className={styles.main_box}>
        <img className={styles.profileimg} src={imgSrc} />
        <div className={styles.contentbox}>{userName}</div>
      </div>
    </Link>
  );
}

interface UserProps {
  name: string | null | undefined;
  id?: number;
}

function ReportIssue() {
  return (
    <div className={styles.issue_box}>
      <div className={styles.icon_box}>
        <AiFillInfoCircle size={20} fill="#B9B9B9" />
      </div>
      <div className={styles.contentbox}>
        <a
          href="https://github.com/sumanbiswas7/cinematic"
          rel="noreferrer"
          target="_blank"
        >
          Report an issue
        </a>
        <p>Help us improve Cinematic by reporting issues and bugs</p>
      </div>
    </div>
  );
}

function NavLink({ href, title }: NavLinkProps) {
  const route = useRouter().route;

  return (
    <Link href={href} className={styles.navlink}>
      <div className={styles.navlink_container}>
        {href == route ? (
          <div className={styles.active_circle}></div>
        ) : (
          <AiOutlineRight fill="#B9B9B9" className={styles.rightarrow_icon} />
        )}
        <p>{title}</p>
      </div>
    </Link>
  );
}

interface NavLinkProps {
  href: string;
  title: string;
}

function NavIconLink({ icon, title, href }: NavIconLinkProps) {
  return (
    <div className={styles.navicon_linkbox}>
      <div id={styles.iconbox}>{icon}</div>
      <Link href={href} className={styles.link}>
        <p>{title}</p>
      </Link>
    </div>
  );
}

interface NavIconLinkProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

function LogOutBtn() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userctx = useContext(userContext);

  async function handleLogout() {
    setLoading(true);
    const auth = getAuth(app);
    auth.signOut();
    const setUser = userctx?.setUser!;
    setUser(null);
    router.replace("/");
  }

  return (
    <>
      <div className={styles.navicon_linkbox}>
        <div id={styles.iconbox}>
          <GoSignOut fill="#B9B9B9" className={styles.logout_icon} />
        </div>
        <button onClick={() => setModal(!modal)} className={styles.logout_btn}>
          Log Out
        </button>
      </div>
      {modal && (
        <>
          <div className={styles.logout_modal}>
            <div className={styles.middle_box}>
              {!loading ? (
                <>
                  <p>Are you sure you want to Log out?</p>
                  <div className={styles.btn_box}>
                    <button onClick={handleLogout} className={styles.yesbtn}>
                      YES
                    </button>
                    <button
                      onClick={() => setModal(!modal)}
                      className={styles.nobtn}
                    >
                      NO
                    </button>
                  </div>
                </>
              ) : (
                <Loader color={"#fff"} size={20} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
