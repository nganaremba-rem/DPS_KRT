import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getdriversWithDetails } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DriversWithDetails = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      data: driversWithDetails,
      error,
    } = useQuery("driversWithDetails", () =>
      getdriversWithDetails(user.userId),
    );

    // REACT-TABLE settting columns and data
    const columns = useMemo(() => {
      if (driversWithDetails?.data)
        return getTableCols(driversWithDetails?.data);
    }, [driversWithDetails?.data]);

    const data = useMemo(() => {
      if (driversWithDetails?.data)
        return getTableData(driversWithDetails?.data);
    }, [driversWithDetails?.data]);

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return (
      <ReactTable columns={columns} data={data} tableName={"All Drivers"} />
    );
  } catch (err) {
    console.error(err);
    return <>Error</>;
  }
};

export default DriversWithDetails;
