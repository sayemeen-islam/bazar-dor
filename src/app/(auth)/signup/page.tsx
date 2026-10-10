"use client";
import React, { useState } from "react";
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
      email: string;
      password: string;
      confirmPassword: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
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
    });
  };

   const handleGitHubSignUp=async()=>{
    await authClient.signIn.social({
        provider: "github"
    })
  }


  return (
    <div className="flex flex-col justify-center items-center max-w-6xl mx-auto my-15">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="text-sm font-normal leading-6 text-foreground/70 mb-8">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>
      <div className="flex items-center justify-center rounded-xl  border bg-surface p-5">
        <Surface className=" min-w-[380px]">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full ">
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
                    className={`border  border-border bg-surface rounded-lg`}
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
                    className={`border  border-border bg-surface rounded-lg`}
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
                    className={`border  border-border bg-surface rounded-lg bg-accent-soft-hover`}
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
                    className={`border  border-border bg-surface rounded-lg`}
                    placeholder="আবার লিখুন"
                  />

                  <FieldError />
                </TextField>
              </Fieldset.Group>

              <Fieldset.Actions className="-my-2">
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

          <div className="space-y-3 my-4">
            <div className="flex justify-center items-center gap-3 text-sm text-muted">
              <Separator
                className="w-[40%]  bg-separator border border-foreground/10"
                orientation="horizontal"
              />
              <span className="text-sm font-medium text-foreground/70">
                অথবা
              </span>
              <Separator
                className="w-[40%] bg-separator border border-foreground/10"
                orientation="horizontal"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="w-full rounded-lg bg-surface border border-border font-semibold text-foreground hover:bg-accent-soft"
                onClick={handleGoogleSignUp}
              >
                <FcGoogle />
                Google দিয়েচালিয়ে যান
              </Button>

              <Button
                className="w-full rounded-lg bg-surface border border-border font-semibold text-foreground  hover:bg-accent-soft"
                onClick={handleGitHubSignUp}
              >
                <FaGithub />
                GitHub দিয়ে চালিয়ে যান{" "}
              </Button>
            </div>
            <p className="text-sm text-center font-medium -mb-2 ">
              অ্যাকাউন্ট আছে?{" "}
              <Link className="text-accent " href="/signin">
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </Surface>
      </div>
      <Link href={'/'}><p className="text-center text-foreground/60 text-sm mt-6 mb-20 ">← হোম পেজে ফিরে যান</p></Link>
    </div>
  );
};

export default SignUpPage;
