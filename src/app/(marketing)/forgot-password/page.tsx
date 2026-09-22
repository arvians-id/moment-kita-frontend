import { AuthPage } from "@/components/marketing/pages/auth-page";

export const metadata = {
  title: "Forgot Password",
  description:
    "Request password reset instructions for your Moment Kita studio account.",
};

export default function Page() {
  return <AuthPage mode="forgot-password" />;
}
