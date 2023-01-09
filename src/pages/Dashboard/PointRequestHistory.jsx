import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsReqHistory } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequestHistory = () => {
  // REACT-TABLE setting columns and data
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointRequestHistory,
    } = useQuery("pointRequestHistory", () =>
      fetchPointsReqHistory(user.userId),
    );

    const columns = useMemo(
      () =>
        pointRequestHistory?.data?.response &&
        getTableCols(pointRequestHistory.data?.response),
      [pointRequestHistory?.data?.response],
    );

    const tableData = useMemo(
      () =>
        pointRequestHistory?.data?.response &&
        getTableData(pointRequestHistory?.data?.response),
      [pointRequestHistory?.data?.response],
    );

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error.message}</h1>;

    return (
      // <></>
      <ReactTable
        columns={columns}
        data={tableData}
        tableName={"Points Request History"}
      />
    );
  } catch (err) {
    console.log(err);
    return <>Error</>;
  }
};

export default PointRequestHistory;
