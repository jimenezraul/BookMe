import { Badge, Card } from "react-daisyui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const redirectToBooking = () => {
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }
    setTimeout(() => {
      navigate("/profile");
    }, 5000);
  };

  redirectToBooking();
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10 flex justify-center'>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-lg'>
            <h1 className='text-3xl font-bold text-center'>Thank You!</h1>
            <p className='text-xl'>Your Appointment has been booked successfully.</p>
            <p>
              You will be redirected to your profile page in{" "}
              <Badge color='primary'>{count}</Badge> seconds.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccess;