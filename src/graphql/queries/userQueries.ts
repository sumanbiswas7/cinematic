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
export const GET_AUTH_USER = gql`
query ($email: String!) {
  get_authuser(email: $email) {
    id
    name
    email
    country
    createdAt
    friends
    notifications {
      id
      from
      request
      suggestion
      createdAt
    }
    movies {
      id
      name
      image
      type
      rating
      createdAt
    }
  }
}
`