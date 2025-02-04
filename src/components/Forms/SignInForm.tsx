"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./Forms.module.css";

type Inputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Sign In</h1>

      {params.get("error") && (
        <Alert severity="error">
          {params.get("error") === "CredentialsSignin"
            ? "Invalid email or password"
            : params.get("error")}
        </Alert>
      )}
      {params.get("success") && (
        <Alert severity="success">{params.get("success")}</Alert>
      )}
      <form
        onSubmit={handleSubmit(formSubmit)}
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            type="email"
            required
            label="Email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email?.message && (
            <p className={styles.formError}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            type="password"
            required
            label="Password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && (
            <p className={styles.formError}>{errors.password.message}</p>
          )}
        </div>
        <Button
          variant="contained"
          loading={isSubmitting}
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className={styles.formFooter}>
        Need an account?{" "}
        <Link
          href={`/signup?callbackUrl=${callbackUrl}`}
          className="link"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
