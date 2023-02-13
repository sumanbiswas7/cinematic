import { NewMovie } from "@/components/NewMovie/NewMovie";
import { useState, useEffect } from "react";
import styles from "./Upload.module.scss";

export default function Upload() {
  return (
    <div className={styles.container}>
      <NewMovie />
    </div>
  );
}
