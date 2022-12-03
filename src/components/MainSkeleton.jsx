import { Skeleton } from "@mui/material";
import React from "react";

const MainSkeleton = () => {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      height={"85vh"}
      width={"100%"}
    />
  );
};

export default MainSkeleton;
