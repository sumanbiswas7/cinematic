import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
mutation ($movie: AddMovie!) {
  add_movie(movie: $movie)
}
`