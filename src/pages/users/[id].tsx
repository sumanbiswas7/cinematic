import styles from "./Users.module.scss";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { User } from "@/components/User/User";
import { useRouter } from "next/router";

export default function UserById() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id as string);

  const res = useQuery(GET_USER, { variables: { userId: userId || 1 } });

  if (res.loading) return <h1>Loading</h1>;
  if (res.error) return <h1>Error</h1>;

  return <User user={res.data.get_user!} />;
}
