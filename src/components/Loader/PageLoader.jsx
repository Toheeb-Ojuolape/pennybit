import { Bars } from "react-loader-spinner";
import "./style.css";

const PageLoader = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-[rgba(255,255,255,0.8)] z-[55] flex items-center justify-center">
      <Bars height="80" width="80" color="#734792" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
    </div>
  );
};

export default PageLoader;
