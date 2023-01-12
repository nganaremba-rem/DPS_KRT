import { TiTick } from "react-icons/ti";

const Success = () => {
  return (
    <>
      <div className="flex h-full justify-center items-center">
        <div className="bg-slate-200 p-10 rounded-full">
          <TiTick size={100} color="green" />
        </div>
      </div>
    </>
  );
};

export default Success;
