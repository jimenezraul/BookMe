import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { theme } from "../../app/storeSlices/theme/themeSlice";
import { useState, useEffect } from "react";
import Loading from "../Loading";

const Location = () => {
  const { data, loading, error } = useFetch("/api/locations");
  const appTheme = useSelector(theme);
  const [isDark, setIsDark] = useState(appTheme === "night");

  useEffect(() => {
    setIsDark(appTheme === "night");
  }, [appTheme]);

  if (error) {
    return <div>Something Went Wrong!</div>;
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {loading && <Loading />}
      {data?.map((location, index) => {
        return (
          <div
            key={index}
            className={`${
              isDark ? "bg-slate-800" : "bg-gray-100"
            } p-2 flex flex-wrap w-11/12 justify-center pt-6 px-4 rounded-xl shadow-lg pb-10 md:pb-6 border-gray-200`}
          >
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
              <div className={`text-center md:text-end border-b md:border-b-0 md:border-r ${isDark ? "border-slate-700" : "border-slate-300"} p-5`}>
                <h1 className='text-slate-500 text-2xl title-font font-medium mb-2'>
                  {location.businessName}
                </h1>
                <p className='leading-relaxed text-slate-500'>
                  {location.address.addressLine1}, {location.address.locality}{" "}
                  {location.address.administrativeDistrictLevel1}{" "}
                  {location.address.postalCode}
                </p>

                {/* phone number */}
                <a href={`tel:${location.phoneNumber}`}>
                  <p className='leading-relaxed text-slate-500 mb-3 font-semibold'>
                    {location.phoneNumber}
                  </p>
                </a>
              </div>
            </div>
            <div className='w-full md:w-1/2 md:text-start text-center p-5'>
              <div className='leading-relaxed text-slate-500'>
                <h2 className='font-bold text-lg'>Business Hours</h2>
                {location.businessHours.periods.map((period, index) => (
                  <div key={index}>
                    <p>
                      {period.dayOfWeek} - {period.open} - {period.close}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Location;
