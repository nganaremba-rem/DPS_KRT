import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchRoles } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const EditRole = () => {
  try {
    const { user } = useAuth();
    // fetch roles fnc

    const {
      data: roles,
      isLoading,
      isError,
      error,
    } = useQuery("roles", () => fetchRoles(user.userId));

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => roles?.data?.response && getTableCols(roles.data?.response),
      [roles?.data?.response],
    );

    const data = useMemo(
      () => roles?.data?.response && getTableData(roles.data?.response),
      [roles?.data?.response],
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
                to={row.values.roleCd}
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
          tableName={"Edit Role"}
          tableHooks={tableHooks}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default EditRole;
