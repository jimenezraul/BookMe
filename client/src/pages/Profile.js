import { Divider, Card, Button } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBooking } from "../api/getBookings";
import { getOrCreate } from "../api/customer";

const Profile = () => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  // if user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    navigate("/");
  }

  useEffect(() => {
    setBookingLoading(true);
    async function fetchData() {
      const data = await getOrCreate([user]);
      const booking = await getBooking(data.id);
      setAppointments(booking);
      setBookingLoading(false);
    }
    fetchData();
  }, [isAuthenticated, user]);

  console.log(appointments);
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10 mx-auto'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full lg:w-1/2 p-1'>
            <Card className='bg-base-300 mb-2 shadow-md w-full max-w-lg'>
              <Card.Body className='w-full flex justify-center'>
                <div className='flex justify-center'>
                  <img
                    className='h-32 w-32 rounded-full'
                    src={user?.picture.replace("s96-c", "s384-c", true)}
                    referrerPolicy='no-referrer'
                    alt='profile'
                  />
                </div>
                <h1 className='text-center text-3xl font-bold'>
                  {user?.given_name} {user?.family_name}
                </h1>
              </Card.Body>
            </Card>
          </div>
          <div className='w-full lg:w-1/2 flex justify-center p-1'>
            <Card className='bg-base-300 mb-2 shadow-md w-full max-w-lg'>
              <Card.Body className='w-full'>
                <h1 className='text-center text-3xl font-bold'>Appointments</h1>
                <Divider />
                {bookingLoading ? (
                  <div className='flex flex-wrap justify-center w-full mb-5'>
                    <progress className='progress progress-primary w-56'></progress>
                  </div>
                ) : appointments.length > 0 ? (
                  appointments.map((appointment, index) => {
                    const isLast = index === appointments.length - 1;
                    return (
                      <div key={appointment.id}>
                        <h2 className='text-2xl font-bold'>
                          {appointment.appointments[0].category}
                        </h2>
                        <div className='flex flex-wrap justify-between w-full'>
                          <p className='text-lg font-bold'>
                            {appointment.appointments[0].itemVariationData.name}
                          </p>
                          <p className='text-lg font-bold text-end'>
                            $
                            {appointment.appointments[0].itemVariationData
                              .priceMoney.amount / 100}
                          </p>
                        </div>
                        <p className='text-lg font-bold'>
                          {appointment.appointmentDate} at{" "}
                          {appointment.appointmentTime}
                        </p>
                        <div className='flex flex-wrap justify-end space-x-3 mt-3'>
                          <Button variant='outline'>Reschedule</Button>
                          <Button className='text-white border-0 bg-red-600 hover:bg-red-800'>
                            Cancel
                          </Button>
                        </div>
                        {!isLast && <Divider />}
                      </div>
                    );
                  })
                ) : (
                  <div className='flex flex-wrap justify-center w-full mb-5'>
                    <p className='text-center'>You have no appointments</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
