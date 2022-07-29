import HeroSection from "../components/Hero";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Staff from "../components/Staff";
import { Divider, Button, Steps } from "react-daisyui";
import StaffServices from "../components/StaffServices";
import BookCalendar from "../components/Calendar";

const BookNow = () => {
  const navigate = useNavigate();
  // get query params from url
  const [searchParams] = useSearchParams();
  const staff = searchParams.get("staff");
  const services = searchParams.get("services");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  let calendar;
  if (services && !date) {
    calendar = <BookCalendar staff={staff} service={services} />;
  }

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <HeroSection title='Appointments' />
      </div>
      <div className='p-3 w-full container'>
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
        {calendar}
      </div>
    </div>
  );
};
export default BookNow;
