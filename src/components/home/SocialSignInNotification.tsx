"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";

export default function SocialSignInNotification() {


  useEffect(() => {
     const params = new URLSearchParams(window.location.search);
    if (params.get("socialSignIn") === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে।");

      window.history.replaceState({}, "", "/");
    }
  }, []);

  return null;
}
