import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const MenuSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton height={50} width={"100%"} />
      <Skeleton height={50} width={"100%"} />
      <Skeleton height={50} width={"100%"} />
      <Skeleton height={50} width={"100%"} />
      <Skeleton height={50} width={"100%"} />
    </Stack>
  );
};

export default MenuSkeleton;
