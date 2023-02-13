import {
  Loader,
  MultiSelect,
  Rating,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useState, useEffect, useRef, MutableRefObject } from "react";
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
  const [rating, setRating] = useState(6.5);
  const [casts, setCasts] = useState<string[] | []>([]);
  const [genre, setGenre] = useState([""]);
  const nameRef = useRef<HTMLInputElement>(null);
  const directorRef = useRef<HTMLInputElement>(null);
  const releaseRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [img, setImg] = useState<ImgState>({
    preview: "/upload/upload.webp",
    file: null,
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files![0];
    if (!imgFile) return;
    const preiewUrl = URL.createObjectURL(imgFile);
    setImg({ preview: preiewUrl, file: imgFile });
  }

  async function handleFormSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // handling genre and casts error
    if (!genre.length || genre.length > 2) {
      return notify(
        "Fill Genre Tags Correctly",
        "Genre tags must be filled and not exceed 2",
        "orange"
      );
    }
    if (!casts.length || casts.length > 2) {
      return notify(
        "Fill Casts Tags Correctly",
        "Casts tags must be filled and not exceed 2",
        "orange"
      );
    }

    const joinedGenre = genre.join("#");
    const joinedCasts = casts.join("#");

    const name = nameRef.current?.value;
    const director = directorRef.current?.value;
    const release = releaseRef.current?.value;
    const description = descriptionRef.current?.value;

    // handling other errors
    if (!name || !director || !release || !description) {
      return notify(
        "Fill the form correctly",
        "You must fill everything with a red asterisk",
        "orange"
      );
    }

    // Upload Image

    const data = {
      image: "uploaded image url",
      rating,
      name,
      director,
      release,
      genre: joinedGenre,
      casts: joinedCasts,
      description,
    };
    setSubmitting(true);
    console.log(data);
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
              <Rating
                onChange={setRating}
                value={rating}
                fractions={2}
                count={10}
                size="md"
                color={"accent"}
              />
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
          <Rating
            onChange={setRating}
            value={rating}
            fractions={2}
            count={10}
            size="md"
            color={"accent"}
          />
        </div>
        <form className={styles.form_container}>
          <h2 className={styles.upload_text}>Upload Movie</h2>
          <div className={styles.two_row}>
            <TextInput
              label="Name"
              ref={nameRef}
              withAsterisk
              placeholder="Pulp Fiction"
              classNames={{ input: styles.input }}
            />
            <TextInput
              label="Director"
              withAsterisk
              placeholder="Quentin Tarantino"
              classNames={{ input: styles.input }}
              ref={directorRef}
            />
          </div>
          <div className={styles.two_row}>
            <TextInput
              label="Release Year"
              withAsterisk
              placeholder="1994"
              classNames={{ input: styles.input }}
              ref={releaseRef}
              type="number"
              min="1900"
              max="2025"
            />
            <MultiSelect
              data={movieGenres}
              value={genre}
              onChange={setGenre}
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
            ref={descriptionRef}
          />
          <button
            disabled={submitting}
            onClick={handleFormSubmit}
            className={styles.upload_btn}
          >
            {submitting ? <Loader size={"xs"} color="white" /> : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );

  function notify(title: string, message: string, color: string) {
    showNotification({
      autoClose: 1500,
      title,
      message,
      color,
    });
  }
}

interface ImgState {
  file: File | null;
  preview: string;
}
