import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
query ($limit: Int!) {
  get_movies(limit: $limit) {
    id
    name
    type
    image
    rating
  }
}
`

export const GET_MOVIE = gql`
query ($movieId: Int!) {
  get_movie(movieId: $movieId) {
    id
    name
    type
    image
    rating
    release
    description
    director
  }
}
`