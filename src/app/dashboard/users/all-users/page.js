"use client";

import React, { useState } from "react";
import UsersList from "./users list/users_list";
const AllUsers = () => {
  const [IsOpenModalAddMember, setIsOpenModalAddMember] = useState(false);

  return (
    <main>
      <div className="flex justify-between items-center">
        <h2 className="text-base md:text-xl font-semibold mb-10">Users</h2>
        <div className="bg-green-500 bg-opacity-[5%] inline-block rounded-lg">
          <button
            onClick={() => setIsOpenModalAddMember(true)}
            className="shadow w-max text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-[0.3s]"
          >
            Add Users
          </button>
        </div>
      </div>

      <section>
        <UsersList
          isAddMemberOpenModalProp={IsOpenModalAddMember}
          setAddMemberModalOpenProp={() => setIsOpenModalAddMember(false)}
        />
      </section>
    </main>
  );
};

export default AllUsers;
