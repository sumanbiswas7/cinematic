import { User } from "@/components/User/User";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { userContext } from "../_app";

export default function Profile() {
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
