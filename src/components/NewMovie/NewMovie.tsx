import { ADD_MOVIE } from "@/graphql/mutations/movieMutations";
import { GET_UPLOAD_URL } from "@/graphql/queries/uploadQueries";
import { userContext } from "@/pages/_app";
import { uploadImagetoS3 } from "@/server/uploadImageToS3";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Loader,
  MultiSelect,
  Rating,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useState, useEffect, useRef, useContext } from "react";
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
  const userctx = useContext(userContext);
  const [getUploadUrl] = useLazyQuery(GET_UPLOAD_URL);
  const [addMovieToDB] = useMutation(ADD_MOVIE);
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

  function emptyForm() {
    const nameC = nameRef.current!;
    const directorC = directorRef.current!;
    const relaseC = releaseRef.current!;
    const descriptionC = descriptionRef.current!;

    nameC.value = "";
    directorC.value = "";
    relaseC.value = "";
    descriptionC.value = "";
    setGenre([]);
    setCasts([]);
    setRating(6.5);
    setImg({
      preview: "/upload/upload.webp",
      file: null,
    });
  }

  async function handleFormSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const user = userctx?.user;
    if (!user?.id) {
      return notify(
        "User not found",
        "You must be signed in to upload a movie",
        "red"
      );
    }
    // handling genre, casts, img error
    if (!img.file) {
      return notify(
        "No image uploaded",
        "Please upload your movie's poster on Upload Image box",
        "orange"
      );
    }
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

    setSubmitting(true);
    // Uploading Image
    const { data, error } = await getUploadUrl();
    if (error) {
      return notify(
        "Opps something went wrong",
        "Sorry something is wrong with the server can't upload image",
        "red"
      );
    }
    const uploadUrl = data.upload;
    const uploadedImg = await uploadImagetoS3(img.file!, uploadUrl);
    if (uploadUrl.err) {
      return notify(
        "Can't upload image",
        "Sorry something is wrong with the server can't upload image",
        "red"
      );
    }

    // Uploading Movie
    const movie = {
      image: uploadedImg.url,
      rating,
      name,
      director,
      release: parseInt(release),
      type: joinedGenre,
      casts: joinedCasts,
      description,
      userId: user.id,
    };
    console.log(movie);
    const { errors } = await addMovieToDB({ variables: { movie } });
    if (errors?.length) {
      notify(
        "Can't upload Movie",
        "Sorry something is wrong with the server can't upload movie",
        "red"
      );
      setSubmitting(false);
      return;
    }
    emptyForm();
    setSubmitting(false);
    notify("Movie Uploaded", "Your movie successfully added", "green");
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
            value={casts}
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
