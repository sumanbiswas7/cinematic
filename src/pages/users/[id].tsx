import styles from "./Users.module.scss";
import { GET_AUTH_USER, GET_USER } from "@/graphql/queries/userQueries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { User } from "@/components/User/User";
import { useRouter } from "next/router";
import { TopNavBar } from "@/components/TopNavBar/TopNavBar";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { userContext } from "../_app";
import { app } from "@/firebase/firebaseConfig";

export default function UserById() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id as string);
  const [getAuthUser, res2] = useLazyQuery(GET_AUTH_USER);
  const userctx = useContext(userContext);
  const res = useQuery(GET_USER, { variables: { userId: userId || 1 } });

  useEffect(() => {
    handleGetAuthUser();
  }, []);

  if (res.loading || res2.loading) return <h1>Loading</h1>;
  if (res.error) return <h1>Error</h1>;

  function handleGetAuthUser() {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const firstload = userctx?.user;
        const setUser = userctx?.setUser!;

        if (!firstload) {
          getAuthUser({
            variables: { email: user.email },
            onCompleted: (data) => setUser(data.get_authuser),
          });
        }
      } else {
      }
    });
  }

  return (
    <>
      {/* <TopNavBar /> */}
      <User user={res.data.get_user!} />
    </>
  );
}
