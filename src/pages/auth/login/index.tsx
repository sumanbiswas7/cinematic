import styles from "./Login.module.scss";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");

    const auth = getAuth(app);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      } else {
        setError("Something went wrong");
      }
    });
  }

  return (
    <div className={styles.container}>
      <form>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button onClick={handleSubmitForm}>Submit</button>
      </form>
    </div>
  );
}
