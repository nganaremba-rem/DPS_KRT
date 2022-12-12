import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPoints } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
// import { ReactTable } from "../../components/ReactTable";
const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Points = () => {
  const {
    isLoading,
    isError,
    error,
    data: points,
  } = useQuery("points", fetchPoints);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      points &&
      Object.keys(points.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [points?.data],
  );

  const data = useMemo(() => points && [...points.data], [points?.data]);

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return <ReactTable columns={columns} data={data} tableName={"Points"} />;
};

export default Points;
