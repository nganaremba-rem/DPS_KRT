import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getdriversPointDisplay } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
import { getCsvHeadersData } from "../../utils/getCsvHeadersData";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DriversPointDisplay = () => {
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      data: driversPointDisplay,
      error,
    } = useQuery("driversPointDisplay", () =>
      getdriversPointDisplay(user.userId),
    );

    // REACT-TABLE settting columns and data
    const columns = useMemo(() => {
      if (driversPointDisplay?.data?.response)
        return getTableCols(driversPointDisplay?.data?.response);
    }, [driversPointDisplay?.data?.response]);

    const data = useMemo(() => {
      if (driversPointDisplay?.data?.response)
        return getTableData(driversPointDisplay?.data?.response);
    }, [driversPointDisplay?.data?.response]);

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    const { headers, data: csvData } = getCsvHeadersData(
      driversPointDisplay?.data?.response,
    );

    return (
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Drivers Point Display"}
        csvLinkProps={{
          headers,
          data: csvData,
        }}
      />
    );
  } catch (err) {
    console.error(err);
    return <>Error</>;
  }
};

export default DriversPointDisplay;
