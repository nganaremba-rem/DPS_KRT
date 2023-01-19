import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { SyncLoader } from "react-spinners";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFilter } from "./ReactTable/GlobalFilter";
import { Pagination } from "./ReactTable/Pagination";

export const ReactTable = ({
  columns,
  data,
  tableHooks = false,
  tableName,
  message = "",
  csvLinkProps,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // Pagination
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    state: { pageIndex, pageSize },
    setPageSize,
    pageCount,
    // Filter
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { globalFilter },
  } = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useGlobalFilter,
    tableHooks && tableHooks,
    useSortBy,
    usePagination,
  );

  // const [tableWidth, setTableWidth] = useState(0);
  const tableRef = useRef();
  // useEffect(() => {
  //   setTableWidth(tableRef.current.offsetWidth);
  //   console.log(tableRef.current.offsetWidth);
  // }, []);

  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-2 w-full px-20 py-10 mx-20 bg-white rounded-xl">
        <h1 className="sticky left-0 font-extrabold text-xl text-gray-600 border-b-2 p-2">
          {tableName}
        </h1>
        <h2 className="text-lg text-gray-600 px-10">No data</h2>
      </div>
    );
  }

  return (
    <>
      {data.length !== 0 ? (
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 100 }}
          exit={{ x: 100 }}
          style={{
            boxShadow: "-1px 1px 7px 0px rgb(0 0 0 / 0.1)",
            // overflowX: "auto",
          }}
          className="m-3 w-screen bg-white  p-5 rounded-lg overflow-hidden"
        >
          <div className="sticky  left-0  border-b-2 p-2 mb-5 flex justify-between">
            <h1 className="font-extrabold text-xl text-gray-600">
              {tableName}
            </h1>
            {csvLinkProps && (
              <CSVLink
                className="bg-gray-800 text-sm text-center h-min text-white px-4 font-bold py-1 rounded-lg"
                headers={csvLinkProps.headers}
                data={csvLinkProps.data}
                filename={csvLinkProps?.fileName}
              >
                {csvLinkProps.buttonName || "Download as CSV"}
              </CSVLink>
            )}
          </div>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />

          {/* <div className="overflow-x-auto overflow-y-hidden w-full mb-2">
            <div
              className={`h-1`}
              style={{
                width: `${tableWidth}px`,
              }}
            ></div>
          </div> */}
          <div className="w-full overflow-x-auto">
            <motion.table
              ref={tableRef}
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              {...getTableProps()}
              className="rounded-xl shadow overflow-hidden w-full"
            >
              <thead className="select-none  bg-slate-300 text-gray-600">
                {headerGroups.map((headerGroup) => {
                  return (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            className="p-2 text-left"
                            {...header.getHeaderProps(
                              header.getSortByToggleProps(),
                            )}
                          >
                            {header.render("Header")}
                            {header.isSorted
                              ? header.isSortedDesc
                                ? " (Sorted by Desc)"
                                : " (Sorted by Asc)"
                              : ""}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody className=" p-2" {...getTableBodyProps()}>
                {page.length === 0 ? (
                  <tr>
                    <td className="text-lg px-3 py-1 text-rose-400 font-bold">
                      Not found
                    </td>
                  </tr>
                ) : (
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        style={{ boxShadow: "0 5px 10px -11px #ccc" }}
                        className="py-5 text-sm hover:bg-slate-200"
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="p-3 max-w-[24em]"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </motion.table>
          </div>
          <Pagination
            pageOptions={pageOptions}
            nextPage={nextPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            gotoPage={gotoPage}
            pageSize={pageSize}
            pageCount={pageCount}
          />
        </motion.div>
      ) : (
        <div className="flex justify-center items-center">
          {/* <SyncLoader color="#36d7b7" size={20} /> */}
          <h1 className="sticky left-0 font-extrabold text-xl text-gray-600 border-b-2 p-2 mb-10">
            {tableName}
          </h1>
          <h1 className="text-2xl font-bold text-gray-600">{message}</h1>
        </div>
      )}
    </>
  );
};
