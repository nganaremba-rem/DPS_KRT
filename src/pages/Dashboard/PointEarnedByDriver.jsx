import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsEarnedByDrivers } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
// import { ReactTable } from "../../components/ReactTable";

const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointsEarnedByDriver = () => {
  const {
    isLoading,
    isError,
    error,
    data: pointsEarnedByDriver,
  } = useQuery("pointsEarnedByDriver", fetchPointsEarnedByDrivers);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      pointsEarnedByDriver &&
      Object.keys(pointsEarnedByDriver.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [pointsEarnedByDriver?.data],
  );

  const data = useMemo(
    () => pointsEarnedByDriver && [...pointsEarnedByDriver.data],
    [pointsEarnedByDriver?.data],
  );

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return (
    <ReactTable
      columns={columns}
      data={data}
      tableName={"Points Earned by Drivers"}
    />
  );
};

export default PointsEarnedByDriver;
