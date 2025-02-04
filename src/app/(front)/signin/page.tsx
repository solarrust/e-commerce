import { Metadata } from "next";

import SignInForm from "@/components/Forms/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function Signin() {
  return <SignInForm />;
}
