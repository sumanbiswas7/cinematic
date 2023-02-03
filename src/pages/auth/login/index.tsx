import styles from "./Login.module.scss";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loader } from "@mantine/core";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmitForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) return setError("Email is required 📧");
    if (!password) return setError("Password is required 🔒");
    setLoading(true);

    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.replace("/");
    } catch (error) {
      console.log(error);
      setError("Opps! Something went wrong");
      setLoading(false);
    }

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //   } else {
    //     setError("Something went wrong");
    //   }
    // });
    
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.form_img}>
          <img className={styles.logo_img} src="/logo.svg" />
        </div>
        <form className={styles.main_form}>
          <p className={styles.header}>Login</p>
          <div className={styles.inp_div}>
            <label className={styles.label} htmlFor="#email">
              Email
            </label>
            <input
              id="#email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              placeholder="yourname@email.com"
              className={styles.input}
              ref={emailRef}
            />
          </div>

          <div className={styles.inp_div}>
            <label className={styles.label} htmlFor="#password">
              Password
            </label>
            <input
              id="#password"
              className={styles.input}
              type="password"
              required
              placeholder="*****"
              ref={passwordRef}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submit_btn}
            onClick={handleSubmitForm}
          >
            {loading ? <Loader size={"xs"} color={"#fff"} /> : "Login"}
          </button>
          {error && <p className={styles.err_text}>{error}</p>}
          <p className={styles.btm_text}>
            New user?
            <Link href="/auth/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
