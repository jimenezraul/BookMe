import { Divider, Card} from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useState } from "react";
import { getBooking } from "../api/getBookings";
import { getOrCreate } from "../api/customer";
import Login from "../components/Login";
import { deleteBooking } from "../api/deleteBooking";
import AppointmentList from "../components/AppointmentList";

const Profile = () => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    setBookingLoading(true);
    if (isAuthenticated) {
      async function fetchData() {
        const data = await getOrCreate([user]);
        const booking = await getBooking(data.id);
        setAppointments(booking);
        setBookingLoading(false);
      }
      fetchData();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Login />;
  }

  async function handleDelete(id) {
    const response = await deleteBooking(id);
    if (response) {
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    }
  }

  return (
    <div className='flex-1'>
      <div className='container mt-10 mx-auto'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full lg:w-5/12 p-1 flex flex-col items-center'>
            <Card className='bg-base-300 mb-2 shadow-md w-full'>
              <Card.Body className='w-full flex justify-center'>
                <div className='flex justify-center'>
                  <img
                    className='h-32 w-32 rounded-full'
                    src={user?.picture.replace("s96-c", "s384-c", true)}
                    referrerPolicy='no-referrer'
                    alt='profile'
                  />
                </div>
                <h1 className='text-center text-2xl font-bold'>
                  {user?.given_name} {user?.family_name}
                </h1>
              </Card.Body>
            </Card>
          </div>
          <div className='w-full lg:w-1/2 flex justify-center p-1'>
            <Card className='bg-base-300 mb-2 shadow-md w-full'>
              <Card.Body className='w-full'>
                <h1 className='text-center text-3xl font-bold'>Appointments</h1>
                <Divider />
                {bookingLoading ? (
                  <div className='flex flex-wrap justify-center w-full'>
                    <progress className='progress progress-primary w-56 my-10'></progress>
                  </div>
                ) : appointments.length > 0 ? (
                  appointments.map((appointment, index) => {
                    const isLast = index === appointments.length - 1;
                    return <AppointmentList key={index} appointment={appointment} isLast={isLast} onDelete={handleDelete} />
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
