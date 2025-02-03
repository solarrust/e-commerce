import { Metadata } from "next";

import RegisterForm from "@/components/Register/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
};
export default async function Register() {
  return <RegisterForm />;
}
