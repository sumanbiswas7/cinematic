import styles from "./Users.module.scss";
import movies from "../../../data/movies.json";

export default function UserById() {
  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <img
          className={styles.userimg}
          src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=unknown&scale=80"
        />
        <h2 className={styles.name}>Jake Wilson</h2>
        <p className={styles.country}>Country: India</p>
        <p className={styles.joined}>Joined 2 days ago</p>
      </div>
      <p className={styles.movies_count}>Movies: 2</p>
      <div className={styles.movies_container}>
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              image={movie.image}
              name={movie.name}
              rating={movie.rating}
              type={movie.type}
            />
          );
        })}
      </div>
    </div>
  );
}

function Movie({ image, name, rating, type }: MovieProps) {
  const ratingNum = parseFloat(rating.toString()).toFixed(1);
  const ratingColor = setRatingColor(rating);

  return (
    <div className={styles.movie_container}>
      <img src={image} className={styles.movieimg} />
      <div className={styles.content_container}>
        <h2>{name}</h2>
        <p>{type}</p>
        <span
          className={styles.rating_box}
          style={{ backgroundColor: ratingColor }}
        >
          {ratingNum}
        </span>
      </div>
    </div>
  );
}

function setRatingColor(rating: number) {
  if (rating > 7.5) return "#277B44";
  else if (rating > 6) return "#B88A1F";
  else return "#BC4838";
}

interface MovieProps {
  image: string;
  name: string;
  type: string;
  rating: number;
}
