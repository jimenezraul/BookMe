import HeroSection from "../components/Hero";
import Locations from "../components/Locations";
import { useSearchParams } from "react-router-dom";

const BookNow = () => {
  // get query params from url
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");

  console.log(location);
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <HeroSection title='Appointments' />
      </div>

      {!location && (
        <>
          <div className='p-5'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font text-base-400 mb-4'>
              Select a Location
            </h1>
          </div>

          {/* Locations */}
          <Locations booknow />
        </>
      )}
    </div>
  );
};
export default BookNow;
