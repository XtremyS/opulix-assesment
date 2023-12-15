import React from "react";
import TopHeader from "./top header/top_header";
import Sidebar from "./Sidebar/Sidebar";
import ProtectedRoute from "@/Libs/Protected Route/protected_route";

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex flex-row min-h-screen bg-[#E5F6FF] max-[992px]:px-4 ">
        {/*Left Side Bar */}
        <Sidebar />

        {/*Right Main section*/}
        <div className="w-full max-[992px]:rounded-[25px] rounded-l-[25px]  bg-white h-fit my-7">
          {/*Right TopBar*/}
          <TopHeader />

          {/* OTHER CHILDREN WILL LOAD HERE */}

          <div className="px-6 py-5 md:px-14">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
