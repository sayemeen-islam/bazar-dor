"use client";

import { useEffect } from "react";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  Separator,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("reason") === "auth-required") {
      toast.error("চালিয়ে যেতে অনুগ্রহ করে সাইন ইন করুন।");
    }

    window.history.replaceState({}, "", "/signin");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("আপনি সফলভাবে সাইন ইন করেছেন!");
      console.log(data);
    }

    if (error) {
      toast.error("সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড যাচাই করুন।");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/?socialSignIn=success",
    });
  };

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/?socialSignIn=success",
    });
  };

  return (
    <main className="mx-auto my-8 flex w-full max-w-6xl flex-col items-center px-4 sm:my-12 md:my-15">
      <h1 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        সাইন ইন
      </h1>

      <p className="mb-6 mt-2 max-w-lg text-center text-sm leading-6 text-foreground/70 sm:mb-8">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-3 sm:p-5">
        <Surface className="w-full min-w-0">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full min-w-0">
              <Fieldset.Group>
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "সঠিক ইমেইল ঠিকানা লিখুন";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-foreground">
                    ইমেইল
                  </Label>
                  <Input
                    className="w-full rounded-lg border border-border bg-surface"
                    placeholder="you@example.com"
                  />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-foreground">
                    পাসওয়ার্ড
                  </Label>
                  <Input
                    className="w-full rounded-lg border border-border bg-surface"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                  />
                  <FieldError />
                </TextField>
              </Fieldset.Group>

              <Fieldset.Actions className="w-full">
                <Button
                  className="w-full rounded-lg font-semibold"
                  variant="primary"
                  type="submit"
                >
                  সাইন ইন
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>

          <div className="my-5 space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm text-muted">
              <Separator
                className="flex-1 bg-separator"
                orientation="horizontal"
              />
              <span className="shrink-0 font-medium text-foreground/70">
                অথবা
              </span>
              <Separator
                className="flex-1 bg-separator"
                orientation="horizontal"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full rounded-lg border border-border bg-surface font-semibold text-foreground hover:bg-accent-soft"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle />
                Google দিয়ে চালিয়ে যান
              </Button>

              <Button
                className="w-full rounded-lg border border-border bg-surface font-semibold text-foreground hover:bg-accent-soft"
                onClick={handleGitHubSignIn}
              >
                <FaGithub />
                GitHub দিয়ে চালিয়ে যান
              </Button>
            </div>

            <p className="flex flex-wrap justify-center gap-1 text-center text-sm font-medium">
              <span>অ্যাকাউন্ট নেই?</span>
              <Link className="text-accent" href="/signup">
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </Surface>
      </div>

      <Link
        href="/"
        className="mb-8 mt-5 text-center text-sm text-foreground/60 sm:mb-12"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;
