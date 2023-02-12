import styles from "./Opps.module.scss";
import { BiErrorCircle } from "react-icons/bi";

export function Opps() {
  return (
    <div className={styles.container}>
      <BiErrorCircle size={60} className={styles.icon} fillOpacity={0.5} />
      <h1>
        <span>Opps!</span>Something went wrong
      </h1>
    </div>
  );
}
