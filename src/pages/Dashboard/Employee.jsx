import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchEmployees } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { getTableCols, getTableData } from "../../reactTableFn";
import { CSVLink } from "react-csv";
import { getCsvHeadersData } from "../../utils/getCsvHeadersData";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Employee = () => {
  // REACT-TABLE setting columns and data
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: employees,
    } = useQuery("employee", () => fetchEmployees(user.userId));

    const columns = useMemo(
      () =>
        employees?.data?.response &&
        getTableCols(employees.data?.response, [
          {
            key: "Active State",
            cell: ({ value }) => {
              const bgColor = value ? "bg-green-500" : "bg-slate-500";
              return (
                <div className="flex justify-center items-center">
                  <div
                    className={`w-5 h-5 text-center rounded-full ${bgColor} text-white`}
                  ></div>
                </div>
              );
            },
          },
          {
            key: "Face Photo",
            cell: ({ value }) => (
              <div className="w-12 h-12 overflow-hidden  rounded-full">
                <img
                  onClick={() => window.open(value)}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={value}
                  alt=""
                />
              </div>
            ),
          },
        ]),
      [employees?.data?.response],
    );

    const tableData = useMemo(
      () =>
        employees?.data?.response && getTableData(employees?.data?.response),
      [employees?.data?.response],
    );

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error.message}</h1>;

    const { headers, data } = getCsvHeadersData(employees?.data?.response);

    return (
      <>
        <ReactTable
          columns={columns}
          data={tableData}
          tableName={"Employees"}
          csvLinkProps={{
            headers,
            data,
            buttonName: "Download as CSV",
            fileName: `Employee ${new Date(Date.now())}`,
          }}
        />
      </>
    );
  } catch (err) {
    console.log(err);
    return <>Error</>;
  }
};

export default Employee;
