import { useIdbPromise } from "../hooks/useIdbPromise";
import { Card, Divider, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const CashAppSuccess = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useIdbPromise("payment", "get");
  const { data: appointments } = useIdbPromise("appointments", "get");
  const { data: guestInfo } = useIdbPromise("guest", "get");

  const userData = {
    data: {
      client: guestInfo,
      appointment: appointments,
      payment: data,
    },
  };
  const { data: createBooking } = useFetch(
    `/api/create-booking`,
    "POST",
    userData
  );

  console.log(createBooking);
  if (error) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <div className='container mt-5 flex justify-center'>
          <Card className='bg-base-300 mb-2 shadow-md'>
            <Card.Body className='w-full max-w-lg'>
              <h1 className='text-center text-2xl font-bold'>
                Sorry something went wrong!
              </h1>
              <Divider className='p-0 m-0' />
              <div className='px-2 mb-3'>
                <p className='font-semibold'>Please try again later.</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10 flex justify-center'>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-lg'>
            <h1 className='text-center text-2xl font-bold'>Thank you!</h1>
            <Divider className='p-0 m-0' />
            <div className='px-2'>
              <p className='font-semibold mb-3'>
                Your CashApp payment has been successfully processed.
              </p>
              <p className='font-semibold mb-3'>
                Confirmation number: {data?.receiptNumber}
              </p>
              <Divider />
              <div className='flex justify-between'>
                <a
                  href={data?.receiptUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button color='primary'>View Receipt</Button>
                </a>
                <Button color='primary' onClick={() => navigate("/profile")}>
                  Go to Profile
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
