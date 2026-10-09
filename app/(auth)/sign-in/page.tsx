 
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/app/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  // Handle errors returned after an OAuth redirect.
  useEffect(() => {
    const url = new URL(window.location.href);
    const error = url.searchParams.get("error");

    if (!error) return;

    const messages: Record<string, string> = {
      unable_to_link_account:
        "We couldn't link your account. Try signing in with your original method.",
      access_denied:
        "Sign-in was cancelled. You can try again anytime.",
      OAuthAccountNotLinked:
        "This email may already be associated with another sign-in method. Try your original method.",
    };

    toast.error(
      messages[error] ||
        "Sign-in failed. Please try again."
    );

    // Remove the error from the URL to prevent repeat notifications.
    url.searchParams.delete("error");
    url.searchParams.delete("error_description");

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    setLoading(true);

    try {
      const result = await signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "Invalid email or password."
        );
        return;
      }

      toast.success("Signed in successfully!");
      window.location.href = "/";
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: SocialProvider
  ) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            `Unable to sign in with ${provider}.`
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error(
        `Unable to sign in with ${provider}. Please try again.`
      );
      setSocialLoading(null);
    }
  };

  const isBusy = loading || socialLoading !== null;

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
            🛒
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your BazarDor account.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={isBusy}
            className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={isBusy}
            className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "Continue with GitHub"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-500">
              Or sign in with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-700"
              >
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}