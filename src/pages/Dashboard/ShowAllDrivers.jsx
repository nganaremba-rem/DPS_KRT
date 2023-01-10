import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getAllDrivers } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const ShowAllDrivers = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      data: allDrivers,
      error,
    } = useQuery("allDrivers", () => getAllDrivers(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(() => {
      if (allDrivers?.data) return getTableCols(allDrivers?.data);
    }, [allDrivers?.data]);

    const data = useMemo(() => {
      if (allDrivers?.data) return getTableData(allDrivers?.data);
    }, [allDrivers?.data]);

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

export default ShowAllDrivers;
