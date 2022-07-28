import HeroSection from "../components/Hero";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Staff from "../components/Staff";
import { Divider, Button } from "react-daisyui";

const BookNow = () => {
  const navigate = useNavigate();
  const [activeTitle, setActiveTitle] = useState("All Staff");
  // get query params from url
  const [searchParams] = useSearchParams();
  const staff = searchParams.get("staff");

  useEffect(() => {
    if (staff) {
      setActiveTitle("Select a Service");
    } else {
      setActiveTitle("All Staff");
    }
  }, [staff]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <HeroSection title='Appointments' />
      </div>
      <div className='p-2 w-full container'>
        <div className='pt-3 flex'>
          {staff && (
            <Button onClick={() => navigate(-1)} variant='outline'>
              Back
            </Button>
          )}
          <h1 className='pl-3 flex flex-col justify-center sm:text-3xl text-2xl font-medium title-font text-base-400'>
            {activeTitle}
          </h1>
        </div>
        <Divider></Divider>
        <Staff />
      </div>
    </div>
  );
};
export default BookNow;
