import Link from "next/link";
import styles from "./ModalLink.module.scss";

export function ModalLink({ href, text }: Props) {
  return (
    <Link href={href} className={styles.link_container}>
      <p className={styles.link}>{text}</p>
    </Link>
  );
}

interface Props {
  href: string;
  text: string;
}
