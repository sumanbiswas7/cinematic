import styles from "./SignUp.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { app } from "@/firebase/firebaseConfig";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loader, Select } from "@mantine/core";
import { data } from "@/constants/countryNames";

export default function SignUp() {
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
      // await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.replace("/");
    } catch (error) {
      console.log(error);
      setError("Opps! Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.form_img}>
          <img className={styles.logo_img} src="/logo.svg" />
        </div>
        <form className={styles.main_form}>
          <p className={styles.header}>Signup</p>
          <TopRow />
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
            {loading ? <Loader size={"xs"} color={"#fff"} /> : "Signup"}
          </button>
          {error && <p className={styles.err_text}>{error}</p>}
          <p className={styles.btm_text}>
            Already have an account?
            <Link href="/auth/login" className={styles.link}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function TopRow() {
  return (
    <div className={styles.top_row}>
      <div className={styles.inp_div}>
        <label className={styles.label} htmlFor="#name">
          Name
        </label>
        <input
          id="#name"
          required
          placeholder="John Doe"
          className={`${styles.name_input}`}
        />
      </div>
      <Select
        placeholder="India"
        label="Country"
        data={data}
        searchable
        autoComplete="nope"
        classNames={{
          item: styles.select_item,
          input: `${styles.input} ${styles.input_country}`,
          label: styles.label,
          wrapper: styles.input_country_wrapper,
        }}
        styles={() => ({
          item: {
            "&[data-selected]": {
              "&, &:hover": {
                backgroundColor: "#ff4350",
                color: "#fff",
              },
            },
          },
        })}
      />
    </div>
  );
}
