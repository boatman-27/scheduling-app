import { DotLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <DotLoader color="#36d7b7" />
      </div>
    </div>
  );
}

export default Loader;
