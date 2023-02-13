import {
  MultiSelect,
  Rating,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { TopNavBar } from "../TopNavBar/TopNavBar";
import styles from "./NewMovie.module.scss";

const movieGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Mystery",
  "Musical",
  "War",
  "Western",
  "Sports",
  "Historical",
  "Biographical",
];

export function NewMovie() {
  const [casts, setCasts] = useState<string[] | []>([]);
  const [img, setImg] = useState<ImgState>({
    preview: "/upload/upload_here.png",
    file: null,
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files![0];
    if (!imgFile) return;
    const preiewUrl = URL.createObjectURL(imgFile);
    setImg({ preview: preiewUrl, file: imgFile });
  }

  return (
    <div className={styles.container}>
      {/* <TopNavBar /> */}
      <div className={styles.from_flex_container}>
        <div className={styles.img_container}>
          <label htmlFor="imgInput" className={styles.img_label}>
            <img className={styles.movie_img} src={img.preview} />
            <div className={styles.rating_box_big}>
              <p className={styles.rate_text}>Rate your movie out of 10</p>
              <Rating fractions={4} count={10} size="md" color={"accent"} />
            </div>
          </label>
          <input
            type="file"
            name="file"
            id="imgInput"
            accept="image/png, image/jpg, image/jpeg"
            className={styles.image_input}
            onChange={handleImageChange}
          />
        </div>
        <div className={styles.rating_box_small}>
          <p className={styles.rate_text}>Rate your movie out of 10</p>
          <Rating fractions={4} count={10} size="md" color={"accent"} />
        </div>
        <form className={styles.form_container}>
          <h2 className={styles.upload_text}>Upload Movie</h2>
          <div className={styles.two_row}>
            <TextInput
              label="Name"
              withAsterisk
              placeholder="Pulp Fiction"
              classNames={{ input: styles.input }}
            />
            <TextInput
              label="Director"
              withAsterisk
              placeholder="Quentin Tarantino"
              classNames={{ input: styles.input }}
            />
          </div>
          <div className={styles.two_row}>
            <TextInput
              label="Release Year"
              withAsterisk
              placeholder="1994"
              classNames={{ input: styles.input }}
            />
            <MultiSelect
              data={movieGenres}
              label="Genre"
              withAsterisk
              placeholder="Crime, Drama"
              classNames={{ input: `${styles.input} ${styles.genre_input}` }}
              searchable
            />
          </div>
          <MultiSelect
            data={casts}
            creatable
            label="Casts"
            withAsterisk
            placeholder="John Travolta, Samuel L. Jackson"
            classNames={{ input: styles.input }}
            className={styles.margin_btm}
            searchable
            getCreateLabel={(query) => `+ Add ${query}`}
            onCreate={(cast) => {
              setCasts([...casts, cast]);
              return cast;
            }}
          />
          <Textarea
            label="Description"
            withAsterisk
            placeholder="In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals."
            classNames={{ input: styles.areainput }}
          />
          <button className={styles.upload_btn}>Upload</button>
        </form>
      </div>
    </div>
  );
}

interface ImgState {
  file: File | null;
  preview: string;
}
