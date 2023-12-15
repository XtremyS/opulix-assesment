"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SupaBase from "@/Libs/Supabase/supabase";

const StatisticsContainer = dynamic(
  () => import("../../../Components/statistics divs/statistics_container"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const InnerHome = () => {
  const [ErrorData, setErrorData] = useState(false);
  const [DataCount, setDataCount] = useState(0);

  const GetAllUsers = async () => {
    try {
      const { data, error } = await SupaBase.from("commoners").select("*");

      console.log(data, "TEST");
      if (data !== null) {
        // Assuming data is an array, use length to get the count
        setDataCount(data.length);
      }
    } catch (error) {
      setErrorData(true);
    }
  };

  useEffect(() => {
    GetAllUsers();
    return () => {};
  }, []);

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 min-[992px]:grid-cols-2  min-[1300px]:grid-cols-4 gap-5 min-[1920px]:gap-32">
        <div className="w-240">
          <StatisticsContainer
            totalCount={DataCount}
            title="Total Users"
            iconName="total_booking_icon"
            backgroundColor="bg-white"
            textColor="black"
            borderColor="#C7C7C7"
          />
        </div>
      </div>
    </section>
  );
};

export default InnerHome;
