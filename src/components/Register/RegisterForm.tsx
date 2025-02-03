"use client";

import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./RegisterForm.module.css";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.registerTitle}>Register</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className={styles.registerForm}
      >
        <div className={styles.formGroup}>
          <TextField
            variant="outlined"
            fullWidth
            id="name"
            type="text"
            required
            label="Name"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name?.message && (
            <p className={styles.formError}>{errors.name.message}</p>
          )}
        </div>
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
        <div className={styles.formGroup}>
          <TextField
            variant="outlined"
            fullWidth
            id="confirmPassword"
            type="password"
            required
            label="Password"
            placeholder="Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => {
                const { password } = getValues();
                return value === password || "Passwords should match";
              },
            })}
          />
          {errors.confirmPassword?.message && (
            <p className={styles.formError}>{errors.confirmPassword.message}</p>
          )}
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
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className={styles.registerFooter}>
        Already have an account?{" "}
        <Link
          href={`/signin?callbackUrl=${callbackUrl}`}
          className="link"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
