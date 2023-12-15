"use client";
import Link from "next/link";
import React, { useState } from "react";
import SupaBase from "@/Libs/Supabase/supabase";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [FormData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  const RouterRef = useRouter();
  const [ErrorData, setErrorData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [ErrorsInputFields, setInputFieldsErrors] = useState({});

  const FormValidation = () => {
    const newErrors = {};

    if (!FormData.userName) {
      newErrors.userName = "User name is required";
    }

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

  const OnClickSignup = (event) => {
    event.preventDefault();

    if (FormValidation()) {
      setIsLoading(true);
      const SaveUpdatedUsers = async () => {
        try {
          const { data, error } = await SupaBase.from("admin")
            .insert({
              su_username: FormData.userName,
              su_email: FormData.userEmail,
              su_password: FormData.userPassword,
            })
            .select("auth_token")
            .single();
          if (data !== null) {
            setIsLoading(false);

            alert("Signup successful!");
            setFormData({
              userName: "",
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
      SaveUpdatedUsers();
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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="mb-10">
              <h1 className="text-2xl font-semibold">Admin Signup</h1>
            </div>
            <htmlForm className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username<span className="text-red-400">*</span>
                </label>
                <div className="mt-1">
                  <input
                    name="userName"
                    type="userName"
                    value={FormData.userName}
                    onChange={OnInputValueChange}
                    placeholder="Enter your username"
                    className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      ErrorsInputFields.userName ? "border-red-500" : ""
                    }`}
                  />{" "}
                  {ErrorsInputFields.userName && (
                    <p className="text-red-500 my-1">
                      {ErrorsInputFields.userName}
                    </p>
                  )}
                </div>
              </div>

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
                  type="submit"
                  onClick={OnClickSignup}
                  className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  {IsLoading ? "Loading..." : "Register Account"}
                </button>
              </div>
            </htmlForm>
          </div>

          <div className="w-full flex justify-center mt-5">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <Link href="/auth/login">Already Have An Account? Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
