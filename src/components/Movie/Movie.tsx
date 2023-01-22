import styles from "./Movie.module.scss";

export function Movie({ imageUrl, name, type, rating }: Props) {
  const ratingColor = setRatingColor(rating);

  return (
    <div className={styles.container}>
      <img src={imageUrl} />

      <div className={styles.bottom_container}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.type}>{type}</p>
        </div>
        <span style={{ backgroundColor: ratingColor }}>{rating}</span>
      </div>
    </div>
  );
}

function setRatingColor(rating: number) {
  if (rating > 7.5) return "#277B44";
  else if (rating > 6) return "#B88A1F";
  else return "#BC4838";
}

interface Props {
  imageUrl: string;
  name: string;
  rating: number;
  type: string;
}
