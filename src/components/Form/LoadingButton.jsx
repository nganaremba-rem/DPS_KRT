import { ClipLoader } from "react-spinners";

const LoadingButton = () => {
  return (
    <div className="w-full col-span-full border border-slate-200 rounded py-1 px-2 flex justify-center items-center">
      <ClipLoader color="#459cdb" />
    </div>
  );
};

export default LoadingButton;
