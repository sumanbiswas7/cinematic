import styles from "./Users.module.scss";
import { useContext } from "react";
import { userContext } from "../_app";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { User } from "@/components/User/User";

export default function UserById() {
  const userctx = useContext(userContext);
  let user = userctx?.user;
  const isuserexists = user ? true : false;
  const userRes = useQuery(GET_USER, {
    variables: { userId: 2 },
    skip: isuserexists,
  });

  if (userRes.loading) return <h1>Loading</h1>;
  if (!isuserexists) user = userRes.data?.get_user;

  return <User user={user!} />;
}
