import { Button } from "react-daisyui";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAppointment,
  appointment,
} from "../../app/storeSlices/appointments/appointmentSlice";
import { idbPromise } from "../../utils/helpers";
import Loading from "../Loading";

const BookTime = ({ staff, services, date, isModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedService = useSelector(appointment);
  const { data, loading, error } = useFetch(
    `/api/availability?staff=${staff}&services=${services}&selectedDate=${date}`
  );

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

  if (!loading && data.length === 0) {
    return (
      <div className='text-center text-xl font-bold'>
        <p className='text-md'>No available time for this date</p>
        <p className='text-sm'>Please select another date</p>
      </div>
    );
  }

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

  return (
    <div className='staff-services'>
      <div className='container'>
        <div className='flex flex-wrap w-full mb-5'>
          {loading ? (
            <div className='flex w-full justify-center'>
              <Loading />
            </div>
          ) : (
            <>
              {data?.map((time, index) => (
                <div
                  key={index}
                  className={`flex ${
                    isModal ? "w-1/2" : "w-1/2 md:w-4/12 lg:w-3/12"
                  } p-2`}
                >
                  <div className='flex-1 card card-side bg-base-300 p- shadow-lg border border-base-300'>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTime;
