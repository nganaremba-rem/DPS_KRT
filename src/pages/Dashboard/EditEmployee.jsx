import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchEmployees } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import EditPage from "./EditPage";

const EditEmployee = () => {
  const { setOpenModal, openModal } = useStateContext();
  const [editUserID, setEditUserID] = useState();

  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery("employee", fetchEmployees);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      employees &&
      Object.keys(employees.data[0]).map((key) => {
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

  const data = useMemo(
    () => employees && [...employees.data],
    [employees?.data],
  );

  const onEditHandler = (e) => {
    e.preventDefault();
  };

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
                setEditUserID(row.values.id);
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
        tableHooks={tableHooks}
        tableName={"Edit Employees"}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
          <EditPage
            route={`employee/getEmpById/${editUserID}`}
            pageName={"Edit Employee"}
            onSubmitHandlerFnc={onEditHandler}
          />
        </>
      </Modal>
    </>
  );
};

export default EditEmployee;
