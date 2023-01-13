import { Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchEmployees } from "../../api/Api";
import { Loading } from "../../components";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { lazyLoad } from "../../lazyLoad";
import { getTableCols, getTableData } from "../../reactTableFn";
import EditPage from "./EditPage";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const EditEmployee = () => {
  try {
    const { setOpenModal, openModal } = useStateContext();
    const [editUserID, setEditUserID] = useState();
    const { user } = useAuth();
    const [empData, setEmpData] = useState([]);

    const {
      isLoading,
      isError,
      error,
      data: employees,
    } = useQuery("employee", () => fetchEmployees(user.userId), {
      onSuccess: (data) => {
        setEmpData(data.data.response);
      },
    });

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () =>
        employees?.data?.response &&
        getTableCols(employees?.data?.response, [
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

    const data = useMemo(
      () =>
        employees?.data?.response && getTableData(employees?.data?.response),
      [employees?.data?.response],
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
                  setEditUserID(row.values.userId);
                  setOpenModal(true);
                }}
                className="bg-violet-500 text-white px-5 py-2 rounded-full"
              >
                Edit
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
        >
          <>
            <EditPage
              data={empData}
              id={editUserID}
              pageName={"Edit Employee"}
              onSubmitHandlerFnc={onEditHandler}
            />
          </>
        </Modal>
      </>
    );
  } catch (err) {
    console.log(err);
    return <> Error</>;
  }
};

export default EditEmployee;
