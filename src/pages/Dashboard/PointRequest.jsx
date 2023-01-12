import { Modal } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { acceptPointRequest, fetchPointsRequested } from "../../api/Api";
import { Loading } from "../../components";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import SnackbarCustom from "../../components/SnackbarCustom";
import useAuth from "../../hooks/useAuth";
import { getTableCols, getTableData } from "../../reactTableFn";

const ModifyPoint = ({
  id,
  point,
  close,
  mutate,
  queryClient,
  isLoading,
  showSnackbar,
  setSeverity,
  setMessage,
}) => {
  const handleSubmitModify = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code === "500") {
          setSeverity("error");
          setMessage(res?.data?.status?.message);
        } else {
          setSeverity("success");
          setMessage("Accepted by Modifying");
        }
        close(false);
        showSnackbar();
        queryClient.invalidateQueries("pointsRequested");
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
        <ButtonWithLoading
          isLoading={isLoading}
          text={"Accept"}
          size={"medium"}
          color={"info"}
          type={"submit"}
        />
      </form>
    </div>
  );
};

// const ReactTable = lazyLoad("./components/ReactTable", "ReactTable");

const PointRequest = () => {
  const [modal, setModal] = useState(false);
  const [reqPointsId, setreqPointsId] = useState("");
  const [modReqPoint, setmodReqPoint] = useState("");
  const queryClient = useQueryClient();
  const [manualLoading, setManualLoading] = useState(false);
  const [toast, setToast] = useState({
    vertical: "top",
    horizontal: "right",
    open: false,
  });
  const { vertical, horizontal, open } = toast;
  //   for transition
  const [transition, setTransition] = useState(undefined);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const showSnackbar = () => {
    setToast((prev) => ({ ...prev, open: true }));
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointsRequested = [],
    } = useQuery("pointsRequested", () => fetchPointsRequested(user.userId));

    const {
      mutate: mutateAccept,
      isLoading: isLoadingAccept,
      isError: isErrorAccept,
      error: errorAccept,
    } = useMutation({
      mutationFn: (data) => acceptPointRequest(data, user.userId),
    });
    const {
      mutate: mutateDeny,
      isLoading: isLoadingDeny,
      isError: isErrorDeny,
      error: errorDeny,
    } = useMutation({
      mutationFn: (data) => acceptPointRequest(data, user.userId),
    });
    const {
      mutate: mutateModify,
      isLoading: isLoadingModify,
      isError: isErrorModify,
      error: errorModify,
    } = useMutation({
      mutationFn: (data) => acceptPointRequest(data, user.userId),
    });

    useEffect(() => {
      if (isLoadingAccept || isLoadingDeny) {
        setManualLoading(true);
      } else {
        setManualLoading(false);
      }
    }, [isLoadingAccept, isLoadingDeny, isLoadingModify]);

    // REACT-TABLE settting columns and data
    const columns = useMemo(() => {
      if (pointsRequested?.data?.response?.length === 0) return [];
      return (
        pointsRequested?.data && getTableCols(pointsRequested?.data?.response)
      );
    }, [pointsRequested?.data]);

    const data = useMemo(() => {
      if (pointsRequested?.data?.response?.length === 0) return [];
      return (
        pointsRequested?.data && getTableData(pointsRequested?.data?.response)
      );
    }, [pointsRequested?.data]);

    let tableHooks;

    if (pointsRequested?.data?.response?.length !== 0) {
      tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "Accept",
            Header: "Accept",
            Cell: ({ row }) => {
              return (
                <ButtonWithLoading
                  isLoading={isLoadingAccept}
                  //   color={"#25ad23"}
                  text={"Accept"}
                  type={"button"}
                  size={"medium"}
                  onClick={() => {
                    const data = {
                      reqPointsId: row.values.reqPntNo,
                      modReqPoint: row.values.reqPoint,
                    };
                    mutateAccept(data, {
                      onSuccess: (res) => {
                        console.log(res);
                        if (res?.data?.status?.code === "500") {
                          setSeverity("error");
                          setMessage(res?.data?.status?.message);
                        } else {
                          setSeverity("success");
                          setMessage("Accepted");
                        }
                        showSnackbar();
                        queryClient.invalidateQueries("pointsRequested");
                      },
                    });
                  }}
                />
              );
            },
          },
          {
            id: "reject",
            Header: "Reject",
            Cell: ({ row }) => {
              return (
                <ButtonWithLoading
                  isLoading={isLoadingDeny}
                  //   color={"#25ad23"}
                  text={"Deny"}
                  type={"button"}
                  size={"medium"}
                  color={"error"}
                  onClick={() => {
                    if (
                      window.confirm("Are you sure you want to delete?") ===
                      true
                    ) {
                      const data = {
                        reqPointsId: row.values.reqPntNo,
                        modReqPoint: 0,
                      };
                      mutateDeny(data, {
                        onSuccess: (res) => {
                          console.log(res);
                          if (res?.data?.status?.code === "500") {
                            setSeverity("error");
                            setMessage(res?.data?.status?.message);
                          } else {
                            setSeverity("error");
                            setMessage("Denied");
                          }
                          showSnackbar();
                          queryClient.invalidateQueries("pointsRequested");
                        },
                      });
                    }
                  }}
                />
              );
            },
          },
          {
            id: "modify",
            Header: "Modify",
            Cell: ({ row }) => {
              return (
                <ButtonWithLoading
                  isLoading={isLoadingModify}
                  text={"Modify"}
                  type={"button"}
                  size={"medium"}
                  color={"info"}
                  onClick={() => {
                    setreqPointsId(row.values.reqPntNo);
                    setmodReqPoint(row.values.reqPoint);
                    setModal(true);
                  }}
                />
              );
            },
          },
        ]);
      };
    }

    if (isLoading) return <MainSkeleton />;
    if (isError) return <h1>{error?.message}</h1>;

    return (
      <>
        <SnackbarCustom
          severity={severity}
          open={open}
          alertText={message}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose}
        />
        <Modal
          open={modal}
          children={
            <>
              <ModifyPoint
                mutate={mutateModify}
                queryClient={queryClient}
                id={reqPointsId}
                point={modReqPoint}
                close={setModal}
                isLoading={isLoadingModify}
                showSnackbar={showSnackbar}
                setSeverity={setSeverity}
                setMessage={setMessage}
              />
            </>
          }
        />

        <Modal
          open={manualLoading}
          children={
            <>
              <Loading />
            </>
          }
        />
        <ReactTable
          columns={columns}
          data={data}
          tableName={"Point Request from drivers"}
          tableHooks={tableHooks}
          message={"No new point request"}
        />
      </>
    );
  } catch (err) {
    console.error(err);
    return <>ERROR</>;
  }
};

export default PointRequest;
