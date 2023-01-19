import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchBranches } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
import { getCsvHeadersData } from "../../utils/getCsvHeadersData";

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
      if (branches?.data?.response)
        return getTableCols(branches?.data?.response);
    }, [branches?.data?.response]);

    const data = useMemo(() => {
      if (branches?.data?.response)
        return getTableData(branches?.data?.response);
    }, [branches?.data?.response]);

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    const { headers, data: csvData } = getCsvHeadersData(
      branches?.data?.response,
    );

    return (
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Branches"}
        csvLinkProps={{
          headers,
          data: csvData,
        }}
      />
    );
  } catch (err) {
    console.error(err);
    return <>Error</>;
  }
};

export default Branch;
