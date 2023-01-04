import React from "react";

export const Pagination = ({
  pageOptions,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  setPageSize,
  pageIndex,
  gotoPage,
  pageSize,
  pageCount,
}) => {
  return (
    <>
      <div className="flex justify-between items-center pt-5 gap-2">
        <div className="prev-next flex gap-2 items-center">
          <button onClick={() => gotoPage(0)}>{"<<<"}</button>
          <button
            className="bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300 text-white py-1 px-2 rounded"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            Previous
          </button>
          <button
            className="bg-green-600 disabled:cursor-not-allowed disabled:bg-green-300 text-white py-1 px-2 rounded"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            Next
          </button>
          <button onClick={() => gotoPage(pageCount - 1)}>{">>>"}</button>
        </div>
        <span className="page-number  shrink-0 bg-slate-300 p-2 rounded text-slate-700">
          Page{" "}
          {pageOptions.length !== 0
            ? pageIndex + 1 + " of " + pageOptions.length
            : "0 of 0"}
        </span>
        <div className="goto-area shrink-0 text-slate-600 flex gap-2 items-center">
          <label htmlFor="goto">Goto Page</label>
          <input
            className="w-[5rem] rounded p-1 flex items-center justify-center border-slate-300 border outline-none focus:ring"
            defaultValue={pageIndex + 1}
            onChange={(e) =>
              e.target.value && gotoPage(Number(e.target.value - 1))
            }
            type="number"
            name="goto"
            id="goto"
          />
        </div>
        <select
          className="p-2 rounded-lg focus:ring outline-none"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          name="pageSize"
          id="pageSize"
        >
          {[3, 5, 10, 20, 30, 40, 50].map((size, index) => {
            return (
              <option key={index} value={size}>
                Show {size} rows
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
