"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SupaBase from "@/Libs/Supabase/supabase";
import Modal from "@/Common Components/Modal/modal";
import { useRouter } from "next/navigation";

const UsersList = ({ isAddMemberOpenModalProp, setAddMemberModalOpenProp }) => {
  const RouterRef = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [ErrorData, setErrorData] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [AllUsersData, setAllUsersData] = useState([]);
  const [ErrorsInputFields, setInputFieldsErrors] = useState({});
  const [FormData, setFormData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
  });
  const Columns = [
    { key: "user_id", title: "ID" },
    { key: "user_name", title: "User Name" },
    { key: "Email", title: "Email" },
    { key: "created_at", title: "User Created At" },
    { key: "action", title: "Action" },
  ];

  const GetAllUsers = async () => {
    try {
      const { data, error } = await SupaBase.from("commoners").select(
        "id,user_name,email,created_at"
      );

      if (data !== null) {
        setAllUsersData(data);
        console.log(data);
      }
    } catch (error) {
      setErrorData(true);
    }
  };

  useEffect(() => {
    GetAllUsers();
    return () => {};
  }, []);

  useEffect(() => {
    const RealTimeChanges = SupaBase.channel("realtime-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "commoners",
        },
        (payload) => {
          console.log(payload);
          GetAllUsers();
        }
      )
      .subscribe();
    return () => {
      SupaBase.removeChannel(RealTimeChanges);
    };
  }, [SupaBase, RouterRef]);

  const OnClickEditUser = (selectedUser) => {
    setIsModalOpen(true);
    setFormData({
      userId: selectedUser.id,
      userName: selectedUser.user_name,
      userEmail: selectedUser.email,
    });
  };

  const OnClickSaveUpdate = (event) => {
    event.preventDefault();

    if (FormValidation()) {
      const SaveUpdatedUsers = async () => {
        try {
          const { data, error } = await SupaBase.from("commoners")
            .update({
              user_name: FormData.userName,
              email: FormData.userEmail,
            })
            .eq("id", FormData.userId);
          setIsModalOpen(false);
          console.log(data);
        } catch (error) {
          setErrorData(true);
        }
      };
      SaveUpdatedUsers();
    }
  };
  const OnClickSaveAddMember = (event) => {
    event.preventDefault();

    if (FormValidation()) {
      const SaveUpdatedUsers = async () => {
        try {
          const { data, error } = await SupaBase.from("commoners").insert({
            user_name: FormData.userName,
            email: FormData.userEmail,
          });

          console.log(data);
          setAddMemberModalOpenProp();
          setFormData({
            userEmail: "",
            userName: "",
          });
        } catch (error) {
          setErrorData(true);
        }
      };
      SaveUpdatedUsers();
    }
  };

  const OnClickDeleteUser = (selectedUser) => {
    const DeleteUsersById = async () => {
      try {
        const { data, error } = await SupaBase.from("commoners")
          .delete()
          .eq("id", selectedUser.id);

        if (data !== null) {
          setAllUsersData(data);
          console.log(data);
        }
      } catch (error) {
        setErrorData(true);
      }
    };
    DeleteUsersById();
  };

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

    setInputFieldsErrors(newErrors);

    // Return true if there are no ErrorsInputFields
    return Object.keys(newErrors).length === 0;
  };

  const OnInputValueChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const DateExtractor = (date) => {
    const dateString = date;
    const dateObject = new Date(dateString);
    const dateOnly = dateObject.toISOString().substring(0, 10);
    return dateOnly;
  };

  return (
    <div>
      {ErrorData ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Image
            width={700}
            height={700}
            src="/images/Doctor listing section/something_went_wrong.svg"
            alt="Oops Something Went Wrong"
            className="object-cover mb-5"
          />
        </div>
      ) : (
        <>
          {/* ADD USERS MODAL */}
          <Modal
            IsOpen={isAddMemberOpenModalProp}
            CloseModal={setAddMemberModalOpenProp}
            modalTitle="Add User"
          >
            <form>
              <div className="mb-5">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name<span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    value={FormData.userName}
                    onChange={OnInputValueChange}
                    className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      ErrorsInputFields.userName ? "border-red-500" : ""
                    }`}
                  />
                </div>

                {ErrorsInputFields.userName && (
                  <p className="text-red-500 my-1">
                    {ErrorsInputFields.userName}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    value={FormData.userEmail}
                    onChange={OnInputValueChange}
                    className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      ErrorsInputFields.userEmail ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {ErrorsInputFields.userEmail && (
                  <p className="text-red-500 my-1">
                    {ErrorsInputFields.userEmail}
                  </p>
                )}
              </div>

              <div className="flex-1 ">
                <div className="bg-green-400 bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => OnClickSaveAddMember(event)}
                    className="shadow w-max text-green-400 px-4 py-2 rounded-lg hover:bg-green-400 hover:text-white transition-all duration-[0.3s]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal>
          {/* EDIT USER MODAL */}
          <Modal
            IsOpen={IsModalOpen}
            CloseModal={() => setIsModalOpen(false)}
            modalTitle="Edit User"
          >
            <form>
              <div className="mb-5">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name<span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    value={FormData.userName}
                    onChange={OnInputValueChange}
                    className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      ErrorsInputFields.userName ? "border-red-500" : ""
                    }`}
                  />
                </div>

                {ErrorsInputFields.userName && (
                  <p className="text-red-500 my-1">
                    {ErrorsInputFields.userName}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    value={FormData.userEmail}
                    onChange={OnInputValueChange}
                    className={`px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      ErrorsInputFields.userEmail ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {ErrorsInputFields.userEmail && (
                  <p className="text-red-500 my-1">
                    {ErrorsInputFields.userEmail}
                  </p>
                )}
              </div>

              <div className="flex-1 ">
                <div className="bg-green-400 bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => OnClickSaveUpdate(event)}
                    className="shadow w-max text-green-400 px-4 py-2 rounded-lg hover:bg-green-400 hover:text-white transition-all duration-[0.3s]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal>

          {IsLoading ? (
            <div className="flex justify-center min-h-[200px] items-center">
              <svg
                className="animate-spin"
                width="40"
                height="40"
                viewBox="0 0 243 243"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="105.5"
                  cy="105.5"
                  r="105.5"
                  transform="matrix(-1 0 0 1 227 16)"
                  stroke="#E0EEFF"
                  strokeWidth="32"
                />
                <path
                  d="M16 121.5C16 135.354 18.7288 149.073 24.0307 161.873C29.3326 174.673 37.1037 186.303 46.9002 196.1C56.6968 205.896 68.3271 213.667 81.1269 218.969C93.9268 224.271 107.646 227 121.5 227"
                  stroke="#1E7BAE"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="w-full min-w-max">
                {/* //! HEADER OF TABLE */}
                <div className="flex w-full min-w-fit bg-primary rounded-md">
                  {Columns.map((column, index) => {
                    return (
                      <div key={index} className="flex-1 p-4 text-white">
                        {column.title}
                      </div>
                    );
                  })}
                </div>
                {/* //! BODY OF TABLE */}
                {AllUsersData && (
                  <>
                    {AllUsersData.length === 0 ? (
                      <p className=" text-red-500 md:text-lg  min-h-[300px] flex items-center justify-center">
                        No Users.
                      </p>
                    ) : (
                      <>
                        {AllUsersData.map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-white border border-[#E9EFF4] my-3 rounded-lg"
                          >
                            <div className="flex-1 p-4 text-[#828282]">
                              {data.id}
                            </div>
                            <div className="flex-1 p-4 text-[#828282]">
                              <div className="flex-1 p-4 text-[#828282]">
                                {data.user_name}
                              </div>
                            </div>

                            <div className="flex-1 p-4 text-[#828282]">
                              {/* <input
                                autocomplete="off"
                                disabled={!EditMode}
                                id="email"
                                name="userEmail"
                                type="text"
                                onChange={OnInputValueChange}
                                value={FormData.userEmail}
                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                placeholder="Email address"
                              /> */}
                              {data.email}
                            </div>
                            <div className="flex-1 p-4 text-[#828282]">
                              {DateExtractor(data.created_at)}
                            </div>

                            <div className="flex flex-[1.1]">
                              <div className="flex-1 p-3">
                                <div className="bg-[#F8A000] bg-opacity-[5%] inline-block rounded-lg">
                                  <button
                                    onClick={() => OnClickEditUser(data)}
                                    className="shadow w-max text-[#F8A000] px-4 py-2 rounded-lg hover:bg-[#F8A000] hover:text-white transition-all duration-[0.3s]"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>

                              <div className="flex-1 p-3">
                                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                                  <button
                                    onClick={() => OnClickDeleteUser(data)}
                                    className="shadow w-max text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsersList;
