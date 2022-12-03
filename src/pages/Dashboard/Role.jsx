import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchRoles } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";

const Role = () => {
  const {
    isLoading,
    isError,
    data: roles,
    error,
  } = useQuery("roles", fetchRoles);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      roles &&
      Object.keys(roles.data[0]).map((key) => {
        return {
          Header: key,
          accessor: key,
        };
      }),
    [roles?.data],
  );

  const data = useMemo(() => roles && [...roles?.data], [roles?.data]);

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return <ReactTable columns={columns} data={data} tableName={"Roles"} />;
};

export default Role;