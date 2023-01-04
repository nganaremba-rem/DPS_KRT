import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchBranches } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Branch = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      data: branches,
      error,
    } = useQuery("branches", () => fetchBranches(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(() => {
      if (branches?.data) return getTableCols(branches?.data);
    }, [branches?.data]);

    const data = useMemo(() => {
      if (branches?.data) return getTableData(branches?.data);
    }, [branches?.data]);

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return <ReactTable columns={columns} data={data} tableName={"Branches"} />;
  } catch (err) {
    console.error(err);
    return <>Error</>;
  }
};

export default Branch;
