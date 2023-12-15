import Image from "next/image";
import React from "react";

const StatisticsContainer = ({
  totalCount,
  title,
  iconName,
  backgroundColor,
  textColor,
  borderColor,
}) => {
  return (
    <div
      className={`${backgroundColor} border border-${borderColor} rounded-xl p-4 shadow-md`}
    >
      <div className="grid grid-cols-2 items-center">
        <div className="mr-4">
          <Image
            src={`/icons/Dashboard common icons/${iconName}.svg`}
            width={70}
            height={70}
            alt={`${title} icon`}
          ></Image>
        </div>
        <div>
          <h1 className={`font-bold text-xl md:text-3xl ${textColor} mb-2`}>
            {totalCount}
          </h1>
          <p
            className={`text-[#787887] truncate eli font-medium text-xs md:text-sm ${textColor}`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsContainer;
