import dynamic from "next/dynamic";
import React from "react";

const UserLayout = dynamic(() => import("../users/page"), {
  loading: () => <p>Loading...</p>,
});

const RootLayout = () => {
  return <UserLayout />;
};

export default RootLayout;
