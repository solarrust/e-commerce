import { Metadata } from "next";

import SignUpForm from "@/components/Forms/SignUpForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
};
export default async function Register() {
  return <SignUpForm />;
}
