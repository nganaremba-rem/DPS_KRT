import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsRequested } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
// import { ReactTable } from "../../components/ReactTable";

const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequest = () => {
  const {
    isLoading,
    isError,
    error,
    data: pointsRequested,
  } = useQuery("pointsRequested", fetchPointsRequested);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      pointsRequested &&
      Object.keys(pointsRequested.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [pointsRequested?.data],
  );

  const data = useMemo(
    () => pointsRequested && [...pointsRequested.data],
    [pointsRequested?.data],
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Accept",
        Header: "Accept",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => {
                alert("Accepted");
              }}
              className="bg-green-600 text-white px-5 py-2 rounded-full"
            >
              Accept
            </button>
          );
        },
      },
      {
        id: "reject",
        Header: "Reject",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => window.confirm("Are you sure you want to delete?")}
              className="bg-red-700 text-white px-5 py-2 rounded-full"
            >
              Reject
            </button>
          );
        },
      },
    ]);
  };

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return (
    <ReactTable
      columns={columns}
      data={data}
      tableName={"Point Request"}
      tableHooks={tableHooks}
    />
  );
};

export default PointRequest;
