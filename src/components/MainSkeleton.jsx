import { Skeleton } from "@mui/material";
import React from "react";

const MainSkeleton = () => {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      height={"85vh"}
      width={"100%"}
      className="mx-10"
    />
  );
};

export default MainSkeleton;
