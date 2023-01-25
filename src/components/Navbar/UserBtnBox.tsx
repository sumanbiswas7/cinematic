import styles from "./UserBtnBox.module.scss";
import {
  AiOutlinePlus,
  AiOutlineWarning,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

export function UserBtnBox() {
  return (
    <div className={styles.container}>
      <Button
        text="Add Movie"
        icon={<AiOutlinePlus color="#fff" size={15} />}
      />
      <Button text="Friends" icon={<FiUsers color="#fff" size={15} />} />
      <Button
        text="Report"
        icon={<AiOutlineWarning color="#fff" size={15} />}
      />
      <Button
        text="Logout"
        icon={<AiOutlineLogout color="#fff" size={15} />}
      />
    </div>
  );
}

function Button({ icon, text }: Props) {
  return (
    <div className={styles.btn_container}>
      {icon}
      <span className={styles.text}>{text}</span>
    </div>
  );
}

interface Props {
  icon: React.ReactNode;
  text: string;
}
