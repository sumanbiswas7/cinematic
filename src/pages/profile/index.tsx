import { User } from "@/components/User/User";
import { useContext } from "react";
import { userContext } from "../_app";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const userctx = useContext(userContext);
  const user = userctx?.user;

  if (!user) return <h1>Login</h1>;

  return <User user={user} />;
}
