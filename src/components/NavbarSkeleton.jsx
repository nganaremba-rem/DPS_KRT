import { Skeleton } from "@mui/material";

const NavbarSkeleton = () => {
  return (
    <div className="mt-0 h-[4.2rem]">
      <Skeleton width={"100%"} height={"100%"} />
    </div>
  );
};

export default NavbarSkeleton;
