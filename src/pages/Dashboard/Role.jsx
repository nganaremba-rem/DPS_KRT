import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchRoles } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
import { getCsvHeadersData } from "../../utils/getCsvHeadersData";
// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Role = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      data: roles,
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

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    const { headers, data: csvData } = getCsvHeadersData(roles?.data?.response);

    return (
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Roles"}
        csvLinkProps={{
          headers,
          data: csvData,
        }}
      />
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default Role;
