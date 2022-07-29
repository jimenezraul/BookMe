import HeroSection from "../components/Hero";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Staff from "../components/Staff";
import { Divider, Button, Steps } from "react-daisyui";
import StaffServices from "../components/StaffServices";

const BookNow = () => {
  const navigate = useNavigate();
  const [activeTitle, setActiveTitle] = useState("All Staff");
  // get query params from url
  const [searchParams] = useSearchParams();
  const staff = searchParams.get("staff");
  const services = searchParams.get("services");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    if (time) {
      setActiveTitle("Confirm");
    } else if (date) {
      setActiveTitle("Select Time");
    } else if (services) {
      setActiveTitle("Select Date");
    } else if (staff) {
      setActiveTitle("Select Service");
    } else {
      setActiveTitle("All Staff");
    }
  }, [staff, services, time, date]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <HeroSection title='Appointments' />
      </div>
      <div className='p-2 w-full container'>
        <div className='pt-3 flex justify-center'>
          <Steps>
            <Steps.Step color='primary'>Staff</Steps.Step>
            <Steps.Step color={`${staff && "primary"}`}>Service</Steps.Step>
            <Steps.Step color={`${services && "primary"}`}>Date</Steps.Step>
            <Steps.Step color={`${date && "primary"}`}>Time</Steps.Step>
            <Steps.Step color={`${time && "primary"}`}>Confirm</Steps.Step>
          </Steps>
        </div>
        <Divider></Divider>
        {staff && (
          <Button onClick={() => navigate(-1)} variant='outline'>
            Back
          </Button>
        )}
        {!staff && <Staff />}
        {!services && <StaffServices staff={staff} />}
      </div>
    </div>
  );
};
export default BookNow;
