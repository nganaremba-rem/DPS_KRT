import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchPointsReqHistory, fetchPointsRequested } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequestHistory = () => {
  try {
    const {
      isLoading,
      isError,
      error,
      data: pointsRequestHistory,
    } = useQuery("pointsRequestHistory", fetchPointsReqHistory);

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () =>
        pointsRequestHistory &&
        Object.keys(pointsRequestHistory.data[0]).map((key) => {
          return {
            Header: key,
            accessor: key,
          };
        }),
      [pointsRequestHistory?.data],
    );

    const data = useMemo(
      () => pointsRequestHistory && [...pointsRequestHistory.data],
      [pointsRequestHistory?.data],
    );

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return (
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Point Request History"}
      />
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default PointRequestHistory;
