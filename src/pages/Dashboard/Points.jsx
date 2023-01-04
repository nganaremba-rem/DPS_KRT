import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPoints } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Points = () => {
  try {
    const { user } = useAuth();
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    const {
      isLoading,
      isError,
      error,
      data: points,
    } = useQuery("points", () =>
      fetchPoints({ userId: user.userId, branchCode: user.divCd.divCd }),
    );

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () => points?.data?.response && getTableCols(points.data.response),
      [points?.data],
    );

    const data = useMemo(
      () => points?.data?.response && getTableData(points?.data?.response),
      [points?.data],
    );

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return <ReactTable columns={columns} data={data} tableName={"Points"} />;
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default Points;
