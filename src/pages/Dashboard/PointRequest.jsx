import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { acceptPointRequest, fetchPointsRequested } from "../../api/Api";
import MainSkeleton from "../../components/MainSkeleton";
import { lazyLoad } from "../../lazyLoad";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";
import { Modal } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";

const ModifyPoint = ({ id, point, close, mutate }) => {
  const handleSubmitModify = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    mutate(formData, {
      onSuccess: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <form
        onSubmit={handleSubmitModify}
        className="bg-slate-300 rounded px-10 py-5 flex-col relative flex gap-2 w-[50%]"
      >
        <button
          className="bg-white rounded-full p-0 absolute top-0 right-0"
          onClick={() => close(false)}
        >
          <AiFillCloseCircle color="red" size={30} />
        </button>
        <h3 className="text-2xl font-bold">{id}</h3>
        <input type="hidden" name="reqPointsId" value={id} />
        <input
          className="rounded p-2"
          type="text"
          name="modReqPoint"
          id="modReqPoint"
          defaultValue={point}
        />
        <button type="submit" className="bg-blue-700 text-white p-2 rounded">
          Accept
        </button>
      </form>
    </div>
  );
};

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequest = () => {
  const [modal, setModal] = useState(false);
  const [reqPointId, setReqPointId] = useState("");
  const [modPoint, setModPoint] = useState("");
  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointsRequested,
    } = useQuery("pointsRequested", () => fetchPointsRequested(user.userId));

    const {
      mutate,
      isLoading: isLoadingAccept,
      isError: isErrorAccept,
      error: errorAccept,
    } = useMutation({
      mutationFn: (data) => acceptPointRequest(data, user.userId),
    });

    // REACT-TABLE settting columns and data
    const columns = useMemo(
      () =>
        pointsRequested?.data && getTableCols(pointsRequested?.data?.response),
      [pointsRequested?.data],
    );

    const data = useMemo(
      () =>
        pointsRequested?.data && getTableData(pointsRequested?.data?.response),
      [pointsRequested?.data],
    );

    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Accept",
          Header: "Accept",
          Cell: ({ row }) => {
            // console.log(row);
            return (
              <button
                onClick={() => {
                  const data = {
                    reqPointsId: row.values.reqPntNo,
                    modReqPoint: row.values.reqPoint,
                  };
                  mutate(data, {
                    onSuccess: (res) => {
                      console.log(res);
                    },
                  });
                }}
                className="bg-green-600 text-white px-5 py-2 rounded-full"
              >
                Accept
              </button>
            );
          },
        },
        {
          id: "reject",
          Header: "Reject",
          Cell: ({ row }) => {
            return (
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete?") === true
                  ) {
                    const data = {
                      reqPointsId: row.values.reqPntNo,
                      modReqPoint: 0,
                    };
                    mutate(data, {
                      onSuccess: (res) => {
                        console.log(res);
                      },
                    });
                  }
                }}
                className="bg-red-700 text-white px-5 py-2 rounded-full"
              >
                Reject
              </button>
            );
          },
        },
        {
          id: "modify",
          Header: "Modify",
          Cell: ({ row }) => {
            return (
              <button
                onClick={() => {
                  setReqPointId(row.values.reqPntNo);
                  setModPoint(row.values.reqPoint);
                  setModal(true);
                }}
                className="bg-teal-700 text-white px-5 py-2 rounded-full"
              >
                Modify
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
        <Modal
          open={modal}
          children={
            <>
              <ModifyPoint
                mutate={mutate}
                id={reqPointId}
                point={modPoint}
                close={setModal}
              />
            </>
          }
        />
        <ReactTable
          columns={columns}
          data={data}
          tableName={"Point Request"}
          tableHooks={tableHooks}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default PointRequest;
