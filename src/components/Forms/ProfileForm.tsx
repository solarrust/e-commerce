"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./Forms.module.css";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
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
      setValue("name", session.user.name!);
      setValue("email", session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
        reset(
          { name, email, password: "", confirmPassword: "" },
          {
            keepDirty: false,
          }
        );
      } else {
        const data = await res.json();
        toast.error(data.message || "error");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="wrapper">
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Profile</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
            />
            {errors.name?.message && (
              <p className={styles.formError}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              placeholder="Email"
            />
            {errors.email?.message && (
              <p className={styles.formError}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              id="password"
              {...register("password", {})}
            />
            {errors.password?.message && (
              <p className={styles.formError}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm New Password</label>
            <TextField
              variant="outlined"
              fullWidth
              type="password"
              id="confirm-password"
              {...register("confirmPassword", {
                validate: (value) => {
                  const { password } = getValues();
                  return value === password || "Passwords do not match";
                },
              })}
            />
            {errors.confirmPassword?.message && (
              <p className={styles.formError}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className={styles.formGroup}>
            <Button
              variant="contained"
              loading={isSubmitting}
              size="large"
              type="submit"
              fullWidth
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
