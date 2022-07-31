import HeroSection from "../components/Hero";
import { useSearchParams, useNavigate } from "react-router-dom";
import Staff from "../components/Staff";
import { Divider, Button, Steps } from "react-daisyui";
import StaffServices from "../components/StaffServices";
import BookCalendar from "../components/Calendar";
import BookTime from "../components/BookTime";
import Confirm from "../components/Confirm";

const BookNow = () => {
  const navigate = useNavigate();
  // get query params from url
  const [searchParams] = useSearchParams();
  const staff = searchParams.get("staff");
  const services = searchParams.get("services");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  let calendar, timeSection, confirm, staffSection, servicesSection;

  if (!staff) {
    staffSection = <Staff />;
  }

  if (staff && !services) {
    servicesSection = <StaffServices staff={staff} />;
  }

  if (services && !date) {
    calendar = <BookCalendar staff={staff} service={services} />;
  }

  if (date && !time) {
    timeSection = <BookTime staff={staff} services={services} date={date} />;
  }

  if (date && time) {
    confirm = (
      <Confirm staff={staff} services={services} date={date} time={time} />
    );
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
        {staffSection}
        {servicesSection}
        {calendar}
        {timeSection}
        {confirm}
      </div>
    </div>
  );
};
export default BookNow;
