import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsEarnedByDrivers } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointsEarnedByDriver = () => {
  // REACT-TABLE setting columns and data
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointsEarnedByDriver,
    } = useQuery("pointEarnedByDriver", () =>
      fetchPointsEarnedByDrivers(user.userId),
    );

    const columns = useMemo(
      () =>
        pointsEarnedByDriver?.data?.response &&
        getTableCols(pointsEarnedByDriver.data?.response),
      [pointsEarnedByDriver?.data?.response],
    );

    const tableData = useMemo(
      () =>
        pointsEarnedByDriver?.data?.response &&
        getTableData(pointsEarnedByDriver?.data?.response),
      [pointsEarnedByDriver?.data?.response],
    );

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error.message}</h1>;

    return (
      // <></>
      <ReactTable
        columns={columns}
        data={tableData}
        tableName={"Points Earned By Driver"}
      />
    );
  } catch (err) {
    console.log(err);
    return <>Error</>;
  }
};

export default PointsEarnedByDriver;
