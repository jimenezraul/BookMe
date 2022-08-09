import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { idbPromise } from "../../utils/helpers";
import { useEffect } from "react";
import { Divider, Button } from "react-daisyui";
import { useState } from "react";

const Update = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth0();

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

  const handleSubmit = async () => {
    setLoading(true);
    const paymentData = {
      data: {
        appointment: data,
      },
    };
    console.log(paymentData);
  };
  const price =
    data?.appointments[0]?.itemVariationData?.priceMoney?.amount / 100;

  return (
    <div className='flex flex-wrap justify-center w-full mb-5'>
      <div className='flex w-full'>
        <div className='flex-1 card card-side p-2'>
          <div className='w-full p-2'>
            <h2 className='card-title'>{data?.appointments[0]?.category}</h2>
            <Divider className='p-0 m-0' />
            <div className='flex flex-wrap justify-between w-full'>
              <div className='w-auto'>
                <p>{data?.appointments[0]?.itemVariationData?.name}</p>
              </div>
              <div className='w-auto'>
                <p className='text-lg font-bold'>${price}</p>
              </div>
            </div>
            <p>{data?.time?.date}</p>
            <p>at {data?.time?.open}</p>
            <p>
              {data?.time?.appointmentSegments[0].durationMinutes} min service
            </p>
            <div className='card-actions justify-end mt-5'>
              {isAuthenticated && (
                <>
                  <Button
                    onClick={handleSubmit}
                    color='primary'
                    loading={loading}
                    disabled={loading}
                  >
                    Confirm
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
