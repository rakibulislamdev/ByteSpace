import type { Metadata } from "next";
import Link from "next/link";
import {
  AuthDivider,
  AuthField,
  AuthKicker,
  AuthShell,
  SocialButtons,
} from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthShell
      pitch="Sign in with ease"
      body="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <div className="flex flex-col gap-8">
        <div>
          <AuthKicker>Sign In</AuthKicker>
          <h2 className="t-display-lg mt-2 text-ink">Welcome Back</h2>
        </div>

        <form className="flex flex-col gap-6" action="#">
          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="designer@example.com"
          />
          <AuthField
            id="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <Button type="submit" variant="lime" size="lg" className="self-end">
            Sign In
          </Button>
        </form>

        <AuthDivider label="or" />
        <SocialButtons />

        <p className="t-body-l self-center text-body">
          New user?{" "}
          <Link
            href="/register"
            className="text-brand transition-colors hover:text-brand-deep"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
