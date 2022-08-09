import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { idbPromise } from "../../utils/helpers";
import { useEffect } from "react";
import { Divider, Button } from "react-daisyui";
import { createBooking } from "../../api/createBooking";
import { useState } from "react";

const Confirm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loginWithPopup, user } = useAuth0();

  useEffect(() => {
    async function handleAppointment() {
      const appointLocal = await idbPromise("appointments", "get");

      if (appointLocal.length > 0) {
        setData(appointLocal[0]);
        return;
      }
      navigate("/booknow");
    }
    handleAppointment();
  }, [navigate]);

  const cancelHandler = () => {
    idbPromise("appointments", "delete", { ...data });
    navigate("/booknow");
  };

  const handleSubmit = async () => {
    if (isAuthenticated) {
      setLoading(true);
      const paymentData = {
        data: {
          guest: user,
          appointment: data,
        },
      };

      try {
        const response = await createBooking(paymentData);

        if (response.booking) {
          idbPromise("appointments", "delete", { ...data });
          navigate("/booking-success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='flex flex-wrap justify-center w-full mb-5'>
      <div className='flex w-full md:w-1/2'>
        <div className='flex-1 card card-side bg-base-100 p- shadow-lg p-2 border border-base-300'>
          <div className='card-body'>
            <h2 className='card-title'>{data?.category}</h2>
            <Divider className='p-0 m-0' />
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-auto'>
                <p>{data?.itemVariationData?.name}</p>
              </div>
              <div className='w-auto'>
                <p className='text-lg font-bold'>${data?.price}</p>
              </div>
            </div>
            <p>{data?.time?.date}</p>
            <p>at {data?.time?.open}</p>
            <p>
              {data?.time?.appointmentSegments[0].durationMinutes} min service
            </p>
            <div className='card-actions justify-end mt-5'>
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={cancelHandler}
                    className='bg-red-500 border-0 hover:bg-red-700 text-white'
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    color='primary'
                    loading={loading}
                  >
                    Confirm
                  </Button>
                </>
              ) : (
                <button
                  onClick={() => loginWithPopup()}
                  className='btn btn-primary'
                >
                  Login To Confirm
                </button>
              )}
            </div>
            {!isAuthenticated && (
              <>
                <Divider>or</Divider>
                <div className='card-actions justify-end mt-5'>
                  <Link to='/guest'>
                    <Button color='primary'>Continue as Guest</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
