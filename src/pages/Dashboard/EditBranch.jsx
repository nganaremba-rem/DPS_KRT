import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchBranches } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const EditBranch = () => {
  try {
    const { user } = useAuth();
    // fetch employees fnc
    const {
      data: branches,
      isLoading,
      isError,
      error,
    } = useQuery("branches", () => fetchBranches(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => branches?.data?.response && getTableCols(branches.data?.response),
      [branches?.data?.response],
    );

    const data = useMemo(
      () => branches?.data?.response && getTableData(branches.data?.response),
      [branches?.data?.response],
    );

    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Edit",
          Header: "Edit",
          Cell: ({ row }) => {
            return (
              <Link
                to={`${row.values.divCd}`}
                className="bg-violet-500 text-white px-5 py-2 rounded-full"
              >
                Edit
              </Link>
            );
          },
        },
      ]);
    };

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return (
      <>
        <ReactTable
          columns={columns}
          data={data}
          tableName={"Edit Branch"}
          tableHooks={tableHooks}
        />
      </>
    );
  } catch (err) {
    console.error(err);
  }
};

export default EditBranch;
