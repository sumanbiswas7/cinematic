import { MultiSelect, Textarea, TextInput, Tooltip } from "@mantine/core";
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

  return (
    <div className={styles.container}>
      <TopNavBar />
      <form className={styles.form_container}>
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
            classNames={{ input: styles.input }}
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
      </form>
    </div>
  );
}
