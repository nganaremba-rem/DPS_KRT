import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchBranches } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";

const Branch = () => {
  const {
    isLoading,
    isError,
    data: branches,
    error,
  } = useQuery("branches", fetchBranches);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      branches &&
      Object.keys(branches.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [branches?.data],
  );

  const data = useMemo(() => branches && [...branches.data], [branches?.data]);

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return <ReactTable columns={columns} data={data} tableName={"Branches"} />;
};

export default Branch;
