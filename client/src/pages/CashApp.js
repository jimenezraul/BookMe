import { useEffect, useRef, useState } from "react";
import { Card, Divider } from "react-daisyui";
import { idbPromise } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { cashAppInit } from "../utils/helpers";
import { useIdbPromise } from "../hooks/useIdbPromise";
import { useDispatch } from "react-redux";
import { setPayment } from "../app/storeSlices/payment/paymentSlice";
import { createBooking } from "../api/createBooking";
import Loading from "../components/Loading";

const CashApp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const cashAppPayEl = useRef();
  const paymentStatus = useRef();

  const { data: appointments } = useIdbPromise("appointments", "get");
  const { data: guestInfo } = useIdbPromise("guest", "get");

  let amount = appointments?.price.toString();

  useEffect(() => {
    if (cashAppPayEl.current) {
      cashAppInit(amount, paymentStatus.current, setStatus);
    }
  }, [amount]);
  
  useEffect(() => {
    if (status === "success") {
      setLoading(true);
      async function savePayment() {
        const payment = await idbPromise("payment", "get");
        const guest = await idbPromise("guest", "get");
        const appointment = await idbPromise("appointments", "get");

        const paymentData = {
          data: {
            payment: payment[0],
            guest: guest[0],
            appointment: appointment[0],
          },
        };

        try {
          await createBooking(paymentData);
        } catch (error) {
          console.log(error);
        }

        idbPromise("appointments", "delete", { ...appointments });
        idbPromise("guest", "delete", { ...guestInfo });
        dispatch(setPayment(payment[0]));
        idbPromise("payment", "delete", { ...payment[0] });
        setLoading(false);
        navigate("/cashapp-success");
        return;
      }
      savePayment();
    }
    if (status === "failure") {
      navigate("/cashapp-error");
      return;
    }
  }, [status, navigate, appointments, guestInfo, dispatch]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center px-3'>
      <div className='mt-10 w-full max-w-md'>
        <h1 className='text-center p-5 text-xl font-bold'>
          Complete your Appointment
        </h1>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-md'>
            {loading ? (
              <div className='flex flex-col justify-center items-center'>
                <h1 className="text-lg">Please wait...</h1>
                <Loading />
              </div>
            ) : (
              <>
                <h1 className='text-xl font-bold'>Customer info</h1>
                <Divider className='p-0 m-0' />
                <div className='px-2 mb-3'>
                  <p className='font-semibold'>
                    Name: {guestInfo?.given_name} {guestInfo?.family_name}
                  </p>
                  <p className='font-semibold'>Email: {guestInfo?.email}</p>
                  <p className='font-semibold'>
                    Phone: {guestInfo?.phoneNumber}
                  </p>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
        {!loading && (
          <Card className='bg-base-300 shadow-md mb-5'>
            <Card.Body className='w-full max-w-md'>
              <h1 className='text-xl font-bold'>{appointments?.category}</h1>
              <Divider className='p-0 m-0' />
              <div className='px-2'>
                <p className='font-semibold'>
                  {appointments?.itemVariationData.name}
                </p>
                <p className='font-semibold'>{appointments?.time.date}</p>
                <p className='font-semibold'>at {appointments?.time.open}</p>
                <p className='font-bold text-2xl text-end mt-3 p-5'>
                  Pay ${amount}
                </p>
                <div ref={cashAppPayEl}></div>
              </div>
              <div ref={paymentStatus}></div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};
export default CashApp;
