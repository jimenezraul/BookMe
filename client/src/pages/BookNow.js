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
    calendar = (
      <div className='flex justify-center'>
        <div className='w-full md:w-3/4 lg:w-1/2'>
          <BookCalendar staff={staff} service={services} />
        </div>
      </div>
    );
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
    <div className='flex-1'>
      <div className='container mx-auto'>
        <h1 className='text-center my-10 text-3xl font-bold'>Appointments</h1>
      </div>
      <div className='p-3 w-full container mx-auto'>
        <Divider className='m-0 p-0'></Divider>
        <div className='pt-3 flex justify-center mb-4 md:m-0'>
          <Steps>
            <Steps.Step color='primary'>Staff</Steps.Step>
            <Steps.Step color={`${staff && "primary"}`}>Service</Steps.Step>
            <Steps.Step color={`${services && "primary"}`}>Date</Steps.Step>
            <Steps.Step color={`${date && "primary"}`}>Time</Steps.Step>
            <Steps.Step color={`${time && "primary"}`}>Confirm</Steps.Step>
          </Steps>
        </div>
        {staff && (
          <Button
            className='mb-2'
            onClick={() => navigate(-1)}
            variant='outline'
          >
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
