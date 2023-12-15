"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SupaBase from "@/Libs/Supabase/supabase";

const LogIn = () => {
  const RouterRef = useRouter();
  const [ErrorData, setErrorData] = useState(false);
  const [ErrorsInputFields, setInputFieldsErrors] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const [FormData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  const FormValidation = () => {
    const newErrors = {};

    if (!FormData.userEmail) {
      newErrors.userEmail = "Email is required";
    }

    if (FormData.userEmail && !/^\S+@\S+\.\S+$/.test(FormData.userEmail)) {
      newErrors.userEmail = "Invalid email address";
    }

    if (!FormData.userPassword) {
      newErrors.userPassword = "Password is required";
    }
    if (!FormData.userConfirmPassword) {
      newErrors.userConfirmPassword = "Confirm Password is required";
    }
    if (FormData.userPassword !== FormData.userConfirmPassword) {
      newErrors.userConfirmPassword = "Passwords do not match";
    }

    setInputFieldsErrors(newErrors);

    // Return true if there are no ErrorsInputFields
    return Object.keys(newErrors).length === 0;
  };

  const OnClickLogin = (event) => {
    event.preventDefault();

    if (FormValidation()) {
      setIsLoading(true);

      const LoginUser = async () => {
        try {
          const { data, error } = await SupaBase.from("admin")
            .select("auth_token")
            .eq("su_email", FormData.userEmail)
            .single();
          console.log(data);
          if (data !== null) {
            setIsLoading(false);

            alert("Login successful!");
            setFormData({
              userEmail: "",
              userPassword: "",
              userConfirmPassword: "",
            });
            setTimeout(() => {
              RouterRef.push("/dashboard");
            }, 200);
            localStorage.setItem("te3m3u5uyn", data.auth_token);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          setErrorData(true);
        }
      };
      LoginUser();
    }
  };

  const OnInputValueChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div>
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email<span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      name="userEmail"
                      type="userEmail"
                      value={FormData.userEmail}
                      onChange={OnInputValueChange}
                      placeholder="Enter your email"
                      className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                        ErrorsInputFields.userEmail ? "border-red-500" : ""
                      }`}
                    />{" "}
                    {ErrorsInputFields.userEmail && (
                      <p className="text-red-500 my-1">
                        {ErrorsInputFields.userEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="userPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password<span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      name="userPassword"
                      type="userPassword"
                      value={FormData.userPassword}
                      onChange={OnInputValueChange}
                      placeholder="Enter your password"
                      className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                        ErrorsInputFields.userPassword ? "border-red-500" : ""
                      }`}
                    />{" "}
                    {ErrorsInputFields.userPassword && (
                      <p className="text-red-500 my-1">
                        {ErrorsInputFields.userPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="userConfirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password<span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      name="userConfirmPassword"
                      type="userConfirmPassword"
                      value={FormData.userConfirmPassword}
                      onChange={OnInputValueChange}
                      placeholder="Enter your password again"
                      className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                        ErrorsInputFields.userConfirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />{" "}
                    {ErrorsInputFields.userConfirmPassword && (
                      <p className="text-red-500 my-1">
                        {ErrorsInputFields.userConfirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    onClick={OnClickLogin}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                  >
                    {IsLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Link href="/auth/signup">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <span>Don&apos;t Have An Account? Signup</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
