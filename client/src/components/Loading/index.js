import { theme } from "../../app/storeSlices/theme/themeSlice";
import { useSelector } from "react-redux";
require("./styles.css");

const Loading = () => {
  const isDark = useSelector(theme);

  return (
    <div className='lds-roller mt-10'>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
      <div className={`${isDark === "night" ? "after:bg-[#3ABFF8]" : "after:bg-[#057AFF] shadow-md"}`}></div>
    </div>
  );
};

export default Loading;
