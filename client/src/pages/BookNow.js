import HeroSection from "../components/Hero";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Staff from "../components/Staff";

const BookNow = () => {
  const [activeTitle, setActiveTitle] = useState("Staff");
  // get query params from url
  const [searchParams] = useSearchParams();
  const staff = searchParams.get("staff");

  useEffect(() => {
    if (staff) {
      setActiveTitle("Select a Service");
    }
  }, [staff]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <HeroSection title='Appointments' />
      </div>

      <div className='p-5'>
        <h1 className='sm:text-3xl text-2xl font-medium title-font text-base-400 mb-4'>
          {activeTitle}
        </h1>
        <Staff />
      </div>
    </div>
  );
};
export default BookNow;
