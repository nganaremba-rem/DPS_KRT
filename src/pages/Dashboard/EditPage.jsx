import { Button, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useQuery } from "react-query";
import { fetchData } from "../../api/Api";
import { Loading } from "../../components";
import TextField from "../../components/Form/TextField";
import MainSkeleton from "../../components/MainSkeleton";
import { useStateContext } from "../../context/ContextProvider";
import { endpoints } from "../../endpoints";

const EditPage = ({ pageName, onSubmitHandlerFnc, id, data = [] }) => {
  const { setOpenModal } = useStateContext();

  data = data.filter((item) => item.userId === id)[0];
  console.log(data);

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  // if (isLoading) return <MainSkeleton />;
  // if (isError) return <h1>{error?.message}</h1>;

  return (
    <>
      <div className="px-20 min-h-screen  xl:px-36 py-10 bg-white shadow rounded-lg ">
        <div
          title="go back"
          onClick={() => setOpenModal(false)}
          className="back text-gray-600 p-2 mb-2 -ml-2 rounded-full hover:bg-slate-200 inline-block cursor-pointer"
        >
          <BiArrowBack size={23} />
        </div>
        <h1 className="text-2xl border-b-2 font-extrabold text-gray-600 mb-5">
          {pageName}
        </h1>
        <form
          onSubmit={onSubmitHandlerFnc}
          className={
            "grid md:grid-cols-2 gap-4 items-center overflow-y-auto h-full"
          }
        >
          {Object.keys(data).map((key) => {
            if (typeof data[key] === "boolean") {
              return (
                <FormControlLabel
                  key={key}
                  control={<Android12Switch defaultChecked={data[key]} />}
                  label={key}
                />
              );
            }
            return <TextField key={key} label={key} value={`${data[key]}`} />;
          })}
          <Button type="submit" className="col-span-full" variant="contained">
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditPage;
