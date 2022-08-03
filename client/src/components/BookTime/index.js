import { Button } from "react-daisyui";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAppointment,
  appointment,
} from "../../app/storeSlices/appointments/appointmentSlice";
import { idbPromise } from "../../utils/helpers";

const BookTime = ({ staff, services, date }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedService = useSelector(appointment);
  const { data, loading, error } = useFetch(
    `/api/availability?staff=${staff}&services=${services}&selectedDate=${date}`
  );

  if (error) {
    return (
      <div className='staff-services'>
        <div className='container'>
          <div className='flex text-center w-full mb-5'>
            Opsss! Something went wrong.
          </div>
        </div>
      </div>
    );
  }

  if (data?.errors) {
    return (
      <div className='staff-services'>
        <div className='container'>
          <div className='text-center w-full mb-5'>
            Please select a future date.
          </div>
        </div>
      </div>
    );
  }

  const handleClick = (time) => {
    dispatch(setAppointment({ ...selectedService, time }));
    idbPromise("appointments", "put", {
      ...selectedService,
        time,
    });
    navigate(
      `?staff=${staff}&services=${services}&date=${date}&time=${time.open}`
    );
  };

  return (
    <div className='staff-services'>
      <div className='container'>
        <div className='flex flex-wrap justify-center w-full mb-5'>
          {loading && <progress className='progress w-56'></progress>}
          {data?.map((time, index) => (
            <div key={index} className='flex w-1/2 md:w-4/12 lg:w-3/12 p-2'>
              <div className='flex-1 card card-side bg-base-100 p- shadow-lg border border-base-300'>
                <div className='card-body'>
                  <h2 className='card-title'>{time.open}</h2>
                  <Button
                    onClick={() => handleClick(time)}
                    color='primary'
                    className='mt-2'
                  >
                    Select Time
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTime;
