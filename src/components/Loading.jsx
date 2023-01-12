import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <HashLoader size={50} color="#36d6be" />
    </div>
  );
};

export default Loading;
