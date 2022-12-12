import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchBranches } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
// import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import { lazyLoad } from "../../lazyLoad";
import EditPage from "./EditPage";
const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const EditBranch = () => {
  const { openModal, setOpenModal } = useStateContext();
  const [branchID, setBranchID] = useState();
  // fetch employees fnc
  const {
    data: branches,
    isLoading,
    isError,
    error,
  } = useQuery("branches", fetchBranches);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      branches &&
      Object.keys(branches.data[0]).map((key) => {
        if (key === "Active State") {
          return {
            Header: key,
            accessor: key,
            Cell: ({ value }) => {
              const bgColor = value ? "bg-slate-500" : "bg-green-500";
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
    [branches?.data],
  );

  const data = useMemo(() => branches && [...branches.data], [branches?.data]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => {
                console.log(row);
                setBranchID(row.values.id);
                setOpenModal(true);
              }}
              className="bg-violet-500 text-white px-5 py-2 rounded-full"
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "Delete",
        Header: "Delete",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => window.confirm("Are you sure you want to delete?")}
              className="bg-red-700 text-white px-5 py-2 rounded-full"
            >
              Delete
            </button>
          );
        },
      },
    ]);
  };

  if (isLoading) return <MainSkeleton />;
  if (isError) return <h1>{error?.message}</h1>;

  return (
    <>
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Edit Branch"}
        tableHooks={tableHooks}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <EditPage
          pageName={"Edit Branch"}
          route={`branch/editBranch/${branchID}`}
        />
      </Modal>
    </>
  );
};

export default EditBranch;
