import { BiError } from "react-icons/bi";
import styles from "../styles/Error.module.scss";

export default function Error() {
  return (
    <div className={styles.container}>
      <BiError size={60} className={styles.icon} fillOpacity={0.5} />
      <h1>
        <span>404</span>Page not found
      </h1>
    </div>
  );
}
