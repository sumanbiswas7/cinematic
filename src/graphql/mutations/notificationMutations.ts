import { gql } from "@apollo/client";

export const ACCEPT_REQUEST = gql`
mutation ($request: AcceptRequest!) {
  accept_request(request: $request)
}
`

export const DELETE_NOTIFICATION = gql`
mutation ($notId: Int!) {
  delete_notification(notId: $notId)
}
`
export const SEND_REQUEST = gql`
mutation ($request: NotificationInput!) {
  send_request(request: $request)
}
`
