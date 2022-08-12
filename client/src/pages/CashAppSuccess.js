import { Card, Divider, Button, Badge } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { payment } from "../app/storeSlices/payment/paymentSlice";
import { useState } from "react";

const CashAppSuccess = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const payments = useSelector(payment);

  const redirectToBooking = () => {
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }
    setTimeout(() => {
      navigate("/booknow");
    }, 5000);
  };

  if (!payments) {
    redirectToBooking();
    return (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <div className='container mt-5 flex justify-center p-3'>
          <Card className='bg-base-300 mb-2 shadow-md'>
            <Card.Body className='w-full max-w-lg'>
              <h1 className='text-center text-2xl font-bold'>
                Opps! Something went wrong
              </h1>
              <Divider className='p-0 m-0' />
              <div className='px-2 mb-3'>
                <span className='font-semibold'>You will be redirected to booking page in <Badge color="primary">{count}</Badge> seconds</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10 flex justify-center p-3'>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-lg'>
            <h1 className='text-center text-3xl font-bold'>Thank you!</h1>
            <Divider className='p-0 m-0' />
            <div className='px-2'>
              <p className='font-semibold mb-3 text-xl text-center'>
                Your CashApp payment has been successfully processed.
              </p>
              <p className='font-semibold mb-3'>
                Confirmation number: {payments?.receiptNumber}
              </p>
              <Divider />
              <div className='flex justify-between space-x-2'>
                <a
                  href={payments?.receiptUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button color='primary'>View Receipt</Button>
                </a>
                <Button color='primary' onClick={() => navigate("/booknow")}>
                  Back to Bookings
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default CashAppSuccess;
