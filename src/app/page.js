"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("te3m3u5uyn")) {
      redirect("/dashboard");
    } else if (!localStorage.getItem("te3m3u5uyn")) {
      redirect("/auth/login");
    }
    return () => {};
  }, []);
}
