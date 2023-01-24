import styles from "./Tags.module.scss";

export function Tags({ data }: Props) {
  return (
    <div className={styles.container}>
      {data.map((t) => {
        return <div className={styles.tag_container}>{t}</div>;
      })}
    </div>
  );
}

interface Props {
  data: string[];
}
