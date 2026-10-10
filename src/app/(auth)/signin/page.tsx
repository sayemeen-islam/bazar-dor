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
import { authClient, } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignInPage = () => {


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
     
      email: string;
      password: string;
      
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
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
  return (
    <div className="flex flex-col justify-center items-center max-w-6xl mx-auto mt-12 mb-25">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        সাইন ইন
      </h1>
      <p className="text-sm font-normal leading-6 text-foreground/70 mb-5">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <div className="flex items-center justify-center rounded-xl  border bg-surface p-5">
        <Surface className=" min-w-[380px]">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full ">
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
            
              </Fieldset.Group>

              <Fieldset.Actions className="-my-2">
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
                type="submit"
              >
                <FcGoogle />
                Google দিয়েচালিয়ে যান
              </Button>

              <Button
                className="w-full rounded-lg bg-surface border border-border font-semibold text-foreground  hover:bg-accent-soft"
                type="submit"
              >
                <FaGithub />
                GitHub দিয়ে চালিয়ে যান{" "}
              </Button>
            </div>
            <p className="text-sm flex justify-center gap-1 font-medium -mb-2 ">
              <span>অ্যাকাউন্ট নেই?</span> 
              <Link className="text-accent " href="/signup">
                সাইন আপ করুন
              </Link>
            </p>
          </div>
        </Surface>
      </div>
      <Link href={'/'}><p className="text-center text-foreground/60 text-sm mt-6 mb-20 ">← হোম পেজে ফিরে যান</p></Link>
    </div>
  );
};

export default SignInPage;