import { avatarStyle } from "@/constants/diceBearStyle";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./NavModal.module.scss";
import {
  AiFillInfoCircle,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineRight,
} from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";
import { useRouter } from "next/router";

export function NavModal() {
  return (
    <div className={styles.container}>
      <User name="Suman Biswas" />
      <ReportIssue />
      <div className={styles.mid_content}>
        <NavLink title="Recently Added" href="/" />
        <NavLink title="Suggestions" href="/suggestions" />
        <NavLink title="Favourites" href="/favourites" />
        <NavLink title="Watch Later" href="/watchlater" />
      </div>
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
        <NavIconLink
          icon={<AiOutlineLogout fill="#B9B9B9" />}
          title="New Movie"
          href="/"
        />
      </div>
    </div>
  );
}

function User({ name }: UserProps) {
  return (
    <Link href={`/profile`} className={styles.link}>
      <div className={styles.main_box}>
        <img
          className={styles.profileimg}
          src={`https://api.dicebear.com/5.x/${avatarStyle}/svg?seed=${name}&scale=80`}
        />
        <div className={styles.contentbox}>
          <h2>{name}</h2>
          <p>See your profile</p>
        </div>
      </div>
    </Link>
  );
}

interface UserProps {
  name: string;
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
  console.log(route, href);

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
      <div>{icon}</div>
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
