"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./SignInForm.module.css";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
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
    <div className={styles.signIn}>
      <h1 className={styles.signInTitle}>Sign In</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className={styles.signInForm}
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
          {errors.email?.message && <p>{errors.email.message}</p>}
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
          {errors.password?.message && <p>{errors.password.message}</p>}
        </div>
        {params.get("error") && (
          <Alert severity="error">
            {params.get("error") === "CredentialsSignin"
              ? "Invalid email or password"
              : params.get("error")}
          </Alert>
        )}
        {params.get("success") && (
          <Alert severity="success">Sign up successful</Alert>
        )}
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
    </div>
  );
};

export default Form;
