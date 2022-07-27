import { useFetch } from "../../pages/hook/useFetch";
import { useSelector } from "react-redux";
import { theme } from "../../features/theme/themeSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Locations = ({ booknow }) => {
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
      {loading && <progress className='progress w-56'></progress>}
      {data?.map((location, index) => {
        return (
          <div
            key={index}
            className='p-2 flex w-10/12 md:w-4/12 justify-center mx-auto'
          >
            <div
              className={`flex-1 pt-6 px-4 flex text-center rounded-xl shadow-lg ${
                isDark ? "bg-slate-800" : "bg-gray-100"
              }  pb-10 md:pb-6 mb-10 border-gray-200`}
            >
              <div className='flex-grow flex flex-col justify-between text-center mt-6 sm:mt-0'>
                <h1 className='text-slate-500 text-2xl title-font font-medium mb-2'>
                  {location.businessName}
                </h1>
                <p className='leading-relaxed text-slate-500'>
                  {location.address.addressLine1}, {location.address.locality}{" "}
                  {location.address.administrativeDistrictLevel1}{" "}
                  {location.address.postalCode}
                </p>

                {!booknow ? (
                  <>
                    {/* phone number */}
                    <a href={`tel:${location.phoneNumber}`}>
                      <p className='leading-relaxed text-slate-500 mb-3 font-semibold'>
                        {location.phoneNumber}
                      </p>
                    </a>
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
                  </>
                ) : (
                  <Link to={`/booknow?location=${location.id}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                      Let's Book Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Locations;
