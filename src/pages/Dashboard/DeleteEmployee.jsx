import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, fetchEmployees } from "../../api/Api";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getTableCols, getTableData } from "../../reactTableFn";

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const DeleteEmployee = () => {
  try {
    const { setOpenModal, openModal } = useStateContext();
    const [editUserID, setEditUserID] = useState();
    const { user } = useAuth();
    const { setAlertOptions, openSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const {
      isLoading,
      isError,
      error,
      data: employees,
    } = useQuery("employee", () => fetchEmployees(user.userId));

    const { mutate, isLoading: isLoadingDeleteUser } = useMutation({
      mutationFn: (data) => deleteUser(user.userId, data),
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code !== "200") {
          setAlertOptions({
            text: res?.data?.status?.subMessages[3],
            severity: "error",
          });
        } else {
          setAlertOptions({
            text: "Deleted Successfully",
            severity: "success",
          });
          queryClient.invalidateQueries("employee");
        }
        openSnackbar();
      },
    });

    const handleDeleteUser = (id) => {
      const readyData = {
        userId: id,
      };
      mutate(readyData);
    };
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
          id: "Delete",
          Header: "Delete",
          Cell: ({ row }) => {
            return (
              <ButtonWithLoading
                isLoading={isLoadingDeleteUser}
                color="error"
                text="Delete"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete User: ${row.values.userId}`,
                    )
                  )
                    handleDeleteUser(row.values.userId);
                }}
                className="bg-red-700 text-white px-5 py-2 rounded-full"
              />
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
          tableName={"Delete Employees"}
        />
      </>
    );
  } catch (err) {
    console.log(err);
    return <> Error</>;
  }
};

export default DeleteEmployee;
