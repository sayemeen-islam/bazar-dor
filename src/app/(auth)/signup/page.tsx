"use client";

import { useState } from "react";
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
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/dashboard",
    });

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
      redirect("/signin");
      console.log(data);
    }

    if (error) {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
      console.log(error);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/?socialSignIn=success",
    });
  };

  const handleGitHubSignUp = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/?socialSignIn=success",
    });
  };

  return (
    <main className="mx-auto my-8 flex w-full max-w-6xl flex-col items-center px-4 sm:my-12 md:my-15">
      <h1 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        অ্যাকাউন্ট তৈরি করুন
      </h1>

      <p className="mb-6 mt-2 text-center text-sm leading-6 text-foreground/70 sm:mb-8">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-3 sm:p-5">
        <Surface className="w-full min-w-0">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full min-w-0">
              <Fieldset.Group>
                <TextField
                  isRequired
                  name="name"
                  type="text"
                  validate={(value) => {
                    if (value.trim().length < 3) {
                      return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-foreground">
                    নাম
                  </Label>
                  <Input
                    className="w-full rounded-lg border border-border bg-surface"
                    placeholder="যেমন: রহিম উদ্দিন"
                  />
                  <FieldError />
                </TextField>

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
                  onChange={(value) => setPassword(value)}
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

                <TextField
                  isRequired
                  minLength={8}
                  name="confirmPassword"
                  type="password"
                  validate={(value) => {
                    if (!value) {
                      return "পাসওয়ার্ড নিশ্চিত করুন";
                    }
                    if (value !== password) {
                      return "দুটি পাসওয়ার্ড মিলছে না";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-foreground">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </Label>
                  <Input
                    className="w-full rounded-lg border border-border bg-surface"
                    placeholder="আবার লিখুন"
                  />
                  <FieldError />
                </TextField>

                <TextField name="image" type="url">
                  <Label className="text-sm font-semibold text-foreground">
                    ছবি
                  </Label>
                  <Input
                    className="w-full rounded-lg border border-border bg-surface"
                    placeholder="ছবির URL দিন"
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
                  অ্যাকাউন্ট তৈরি করুন
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
                onClick={handleGoogleSignUp}
              >
                <FcGoogle />
                Google দিয়ে চালিয়ে যান
              </Button>

              <Button
                className="w-full rounded-lg border border-border bg-surface font-semibold text-foreground hover:bg-accent-soft"
                onClick={handleGitHubSignUp}
              >
                <FaGithub />
                GitHub দিয়ে চালিয়ে যান
              </Button>
            </div>

            <p className="text-center text-sm font-medium">
              অ্যাকাউন্ট আছে?{" "}
              <Link className="text-accent" href="/signin">
                সাইন ইন করুন
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

export default SignUpPage;
