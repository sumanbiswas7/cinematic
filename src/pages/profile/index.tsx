import { User } from "@/components/User/User";
import { useContext, useEffect } from "react";
import { userContext } from "../_app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLazyQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/userQueries";
import { app } from "@/firebase/firebaseConfig";

export default function Profile() {
  const [getAuthUser, res] = useLazyQuery(GET_AUTH_USER);
  const userctx = useContext(userContext);
  const user = userctx?.user;

  useEffect(() => {
    handleGetAuthUser();
  }, []);

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

  if (res.loading) return <h1>Loading</h1>;
  if (!user) return <h1>Session Expired</h1>;
  return <User user={user!} />;
}
