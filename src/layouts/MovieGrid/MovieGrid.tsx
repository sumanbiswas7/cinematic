import styles from "./MovieGrid.module.scss";

export function MovieGrid({ children }: Props) {
  return <div className={styles.grid_container}>{children}</div>;
}

interface Props {
  children?: React.ReactNode;
}
