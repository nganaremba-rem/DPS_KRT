import { Modal } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { acceptGivePoint, postAcceptGivePoint } from "../../api/Api";
import { Loading } from "../../components";
import ButtonWithLoading from "../../components/Form/ButtonWithLoading";
import MainSkeleton from "../../components/MainSkeleton";
import { ReactTable } from "../../components/ReactTable";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getTableCols, getTableData } from "../../reactTableFn";

const ModifyPoint = ({
  id,
  point,
  close,
  mutate,
  queryClient,
  isLoading,
  showSnackbar,
  setAlertOptions,
}) => {
  const handleSubmitModify = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.data?.status?.code !== "200") {
          setAlertOptions({
            text: res?.data?.status?.subMessages[3],
            severity: "error",
          });
        } else {
          setAlertOptions({
            text: "Modifiend & Accepted",
            severity: "success",
          });
        }
        close(false);
        showSnackbar();
        queryClient.invalidateQueries("acceptGivePoint");
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
        <input type="hidden" name="givPntNo" value={id} />
        <input
          className="rounded p-2"
          type="text"
          name="modGivPoint"
          id="modGivPoint"
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

const AcceptGivePoint = () => {
  const [modal, setModal] = useState(false);
  const [reqPointId, setReqPointId] = useState("");
  const [modPoint, setModPoint] = useState("");
  const queryClient = useQueryClient();
  const [manualLoading, setManualLoading] = useState(false);
  const { setAlertOptions, openSnackbar } = useSnackbar();

  try {
    const { user } = useAuth();
    const {
      isLoading,
      isError,
      error,
      data: pointsRequested = [],
    } = useQuery("acceptGivePoint", () => acceptGivePoint(user.userId));

    const {
      mutate: mutateAccept,
      isLoading: isLoadingAccept,
      isError: isErrorAccept,
      error: errorAccept,
    } = useMutation({
      mutationFn: (data) => postAcceptGivePoint(data, user.userId),
    });
    const {
      mutate: mutateDeny,
      isLoading: isLoadingDeny,
      isError: isErrorDeny,
      error: errorDeny,
    } = useMutation({
      mutationFn: (data) => postAcceptGivePoint(data, user.userId),
    });
    const {
      mutate: mutateModify,
      isLoading: isLoadingModify,
      isError: isErrorModify,
      error: errorModify,
    } = useMutation({
      mutationFn: (data) => postAcceptGivePoint(data, user.userId),
    });

    useEffect(() => {
      if (isLoadingAccept || isLoadingDeny) {
        setManualLoading(true);
      } else {
        setManualLoading(false);
      }
    }, [isLoadingAccept, isLoadingDeny]);

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
                      givPntNo: row.values.givPntNo,
                      modGivPoint: row.values.point,
                    };
                    mutateAccept(data, {
                      onSuccess: (res) => {
                        console.log(res);
                        if (res?.data?.status?.code !== "200") {
                          setAlertOptions({
                            text: res?.data?.status?.subMessages[3],
                            severity: "error",
                          });
                        } else {
                          setAlertOptions({
                            text: "Accepted",
                            severity: "success",
                          });
                        }
                        openSnackbar();
                        queryClient.invalidateQueries("acceptGivePoint");
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
                        givPntNo: row.values.givPntNo,
                        modGivPoint: 0,
                      };
                      mutateDeny(data, {
                        onSuccess: (res) => {
                          console.log(res);
                          if (res?.data?.status?.code !== "200") {
                            setAlertOptions({
                              text: res?.data?.status?.subMessages[3],
                              severity: "error",
                            });
                          } else {
                            setAlertOptions({
                              text: "Denied",
                              severity: "error",
                            });
                          }
                          openSnackbar();
                          queryClient.invalidateQueries("acceptGivePoint");
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
                    setReqPointId(row.values.givPntNo);
                    setModPoint(row.values.point);
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
        <Modal
          open={modal}
          children={
            <>
              <ModifyPoint
                mutate={mutateModify}
                queryClient={queryClient}
                id={reqPointId}
                point={modPoint}
                close={setModal}
                isLoading={isLoadingModify}
                showSnackbar={openSnackbar}
                setAlertOptions={setAlertOptions}
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
          tableName={"Point Request from Branch Manager"}
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

export default AcceptGivePoint;
