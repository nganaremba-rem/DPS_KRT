import { motion } from "framer-motion";
import React from "react";
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

  return (
    <>
      {data.length !== 0 ? (
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 100 }}
          exit={{ x: 100 }}
          style={{
            boxShadow: "-1px 1px 7px 0px rgb(0 0 0 / 0.1)",
            overflowX: "auto",
          }}
          className="m-3 bg-white  p-5 rounded-lg overflow-hidden"
        >
          <h1 className="sticky left-0 font-extrabold text-2xl text-gray-600 border-b-2 p-2 mb-10">
            {tableName}
          </h1>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />

          <motion.table
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            {...getTableProps()}
            className="rounded-xl shadow overflow-hidden w-full"
          >
            <thead className="select-none bg-slate-300 text-gray-600">
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
                  <td className="text-3xl text-gray-600 font-bold">
                    No Employee
                  </td>
                </tr>
              ) : (
                page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      style={{ boxShadow: "0 5px 10px -11px #ccc" }}
                      className="py-5 hover:bg-slate-200"
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
          <SyncLoader color="#36d7b7" size={20} />
        </div>
      )}
    </>
  );
};
