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
