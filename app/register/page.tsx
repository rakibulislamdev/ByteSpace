import type { Metadata } from "next";
import Link from "next/link";
import {
  AuthField,
  AuthKicker,
  AuthShell,
} from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell
      pitch="Sign up and come in"
      body="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly using your email address."
    >
      <div className="flex flex-col gap-8">
        <div>
          <AuthKicker>Create an Account</AuthKicker>
          <h2 className="t-display-lg mt-2 text-ink">Welcome to ByteSpace</h2>
        </div>

        <form className="flex flex-col gap-6" action="#">
          <AuthField id="name" label="Full Name" placeholder="Jamie Davis" />
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
            Continue
          </Button>
        </form>

        <p className="t-body-l self-center text-body">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand transition-colors hover:text-brand-deep"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
