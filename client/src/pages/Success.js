import { Card } from "react-daisyui";

const Success = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mx-auto p-3 flex justify-center'>
        <Card className='bg-base-300 p-5 text-center shadow-lg w-full max-w-xl'>
          <Card.Body>
            <h2 className='text-3xl font-bold'>Thank You!</h2>
            <p className='text-xl'>
              Your Appointment has been booked successfully.
            </p>
            <p>You will receive an email confirmation shortly.</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Success;
