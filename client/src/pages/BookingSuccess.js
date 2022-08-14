import { Badge, Card } from "react-daisyui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [count, navigate]);
  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='container mx-auto mt-10 flex justify-center p-3'>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-lg'>
            <h1 className='text-3xl font-bold text-center'>Thank You!</h1>
            <p className='text-xl text-center'>
              Your Appointment has been booked successfully.
            </p>
            <span className="text-center">
              You will be redirected to your profile page in{" "}
              <Badge color='primary'>{count}</Badge> seconds.
            </span>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccess;
