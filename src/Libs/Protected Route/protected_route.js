"use client";
import React, { useEffect, useState } from "react";
import SupaBase from "@/Libs/Supabase/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const RouterRef = useRouter();
  useEffect(() => {
    const AuthMe = async () => {
      try {
        const { data, error } = await SupaBase.from("admin")
          .select("auth_token")
          .eq("auth_token", localStorage.getItem("te3m3u5uyn"))
          .single();

        if (data !== null) {
          console.log(data, "DATA ADMIN");
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.log(error, "ERROR");
      }
    };

    AuthMe();
  }, []);

  if (isAdmin === null) {
    // Loading state, you might want to add a loading spinner or message here
    return (
      <div className="text-green-500 text-2xl flex justify-center items-center h-screen">
        Loading....
      </div>
    );
  }

  return isAdmin ? (
    <>{children}</>
  ) : (
    <div className="flex justify-center flex-col items-center h-screen">
      <p className="text-red-500 text-2xl mb-5">
        Only Admins Can Access Dashboard.
      </p>

      <div className="bg-green-400 bg-opacity-[5%] inline-block rounded-lg">
        <Link href="/auth/login">
          <button className="shadow w-max text-green-400 px-4 py-2 rounded-lg hover:bg-green-400 hover:text-white transition-all duration-[0.3s]">
            Go To Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProtectedRoute;
