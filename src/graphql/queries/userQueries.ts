import { gql } from "@apollo/client";

export const GET_USER = gql`
query ($userId: Int!) {
  get_user(id: $userId) {
    id
    name
    email
    country
    createdAt
    notifications {
      id
      from
      request
      suggestion
    }
    movies {
      id
      name
      image
      type
      rating
    }
  }
}
`