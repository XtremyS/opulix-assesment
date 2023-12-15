import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="h-[90vh] grid place-content-center">
        <div>
          <Image
            priority
            height={150}
            width={150}
            src="/heart_rate_loading.gif"
            alt="loading gif"
          ></Image>
        </div>
      </div>
    </>
  );
};

export default Loading;
