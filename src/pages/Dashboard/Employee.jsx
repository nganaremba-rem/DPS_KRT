import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchEmployees } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const Employee = () => {
  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery("employee", fetchEmployees);

  // REACT-TABLE setting columns and data
  const columns = useMemo(
    () =>
      employees &&
      Object.keys(employees?.data[0]).map((key) => {
        if (key === "Active State") {
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }) => {
              const bgColor = value ? "bg-green-500" : "bg-slate-500";
              return (
                <div className="flex justify-center items-center">
                  <div
                    className={`w-5 h-5 text-center rounded-full ${bgColor} text-white`}
                  ></div>
                </div>
              );
            },
          };
        } else if (key === "Face Photo") {
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }) => (
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
          };
        }
        return {
          Header: key,
          accessor: key,
        };
      }),
    [employees?.data],
  );

  const tableData = useMemo(
    () => employees && [...employees?.data],
    [employees?.data],
  );

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <ReactTable columns={columns} data={tableData} tableName={"Employees"} />
  );
};

export default Employee;
