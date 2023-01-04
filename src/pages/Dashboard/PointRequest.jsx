import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsRequested } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequest = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointsRequested,
    } = useQuery("pointsRequested", () => fetchPointsRequested(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () =>
        pointsRequested?.data && getTableCols(pointsRequested?.data?.response),
      [pointsRequested?.data],
    );

    const data = useMemo(
      () =>
        pointsRequested?.data && getTableData(pointsRequested?.data?.response),
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
                onClick={() =>
                  window.confirm("Are you sure you want to delete?")
                }
                className="bg-red-700 text-white px-5 py-2 rounded-full"
              >
                Reject
              </button>
            );
          },
        },
        {
          id: "modify",
          Header: "Modify",
          Cell: ({ row }) => {
            return (
              <button
                onClick={() => window.alert("Modifying")}
                className="bg-teal-700 text-white px-5 py-2 rounded-full"
              >
                Modify
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
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default PointRequest;
