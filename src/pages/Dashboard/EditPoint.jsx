import { Button, Modal } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchPoints } from "../../api/Api";
import { Loading } from "../../components";
import TextField from "../../components/Form/TextField";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import { useStateContext } from "../../context/ContextProvider";

const Point = () => {
  const [userDetail, setUserDetail] = useState();
  const { openModal, setOpenModal } = useStateContext();
  // fetch employees fnc
  const {
    data: points,
    isLoading,
    isError,
    error,
  } = useQuery("points", fetchPoints);

  // REACT-TABLE settting columns and data
  const columns = useMemo(
    () =>
      points &&
      Object.keys(points.data[0]).map((key) => {
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
    [points?.data],
  );

  const data = useMemo(() => points && [...points.data], [points?.data]);

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
                setUserDetail({
                  Username: row.values["Driver Name"],
                  id: row.values.id,
                  Point: row.values.Points,
                });
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
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <ReactTable
        columns={columns}
        data={data}
        tableName={"Edit Point"}
        tableHooks={tableHooks}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="bg-white min-h-screen grid place-items-center">
          {userDetail ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="grid gap-5 shadow-lg p-5 rounded-lg"
              >
                <Button onClick={() => setOpenModal(false)}>Back</Button>
                {Object.keys(userDetail).map((key, index) => {
                  return (
                    <div>
                      {key === "Point" ? (
                        <>
                          <TextField label={key} value={userDetail[key]} />
                        </>
                      ) : (
                        <>
                          <div className="text-gray-700 p-2" htmlFor={index}>
                            {key}
                          </div>
                          <p className="px-2">{userDetail[key]}</p>
                        </>
                      )}
                    </div>
                  );
                })}
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </form>
            </>
          ) : (
            "Loading"
          )}
        </div>
      </Modal>
    </>
  );
};

export default Point;
