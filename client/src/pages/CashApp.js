import { useEffect, useRef, useState } from "react";
import { Card, Divider, Badge } from "react-daisyui";
import { useSelector, useDispatch } from "react-redux";
import {
  appointment,
  setAppointment,
} from "../app/storeSlices/appointments/appointmentSlice";
import { idbPromise } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { cashAppInit } from "../utils/helpers";
import { guest, setGuest } from "../app/storeSlices/guest/guestSlice";

const CashApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointments = useSelector(appointment);
  const guestInfo = useSelector(guest);
  const [status, setStatus] = useState(null);
  const paymentAmount = useRef();
  const cashAppPayEl = useRef();
  const paymentStatus = useRef();

  useEffect(() => {
    async function appointments() {
      const appointLocal = await idbPromise("appointments", "get");
      if (appointLocal.length > 0) {
        dispatch(setAppointment(appointLocal[0]));
        return;
      }
      navigate("/booknow");
    }
    appointments();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!guestInfo) {
      async function guest() {
        const guestLocal = await idbPromise("guest", "get");
        if (guestLocal.length > 0) {
          dispatch(setGuest(guestLocal[0]));
          return;
        }
        navigate("/booknow");
      }
      guest();
    }
  }, [dispatch, guestInfo, navigate]);

  let amount = appointments?.price.toString();

  useEffect(() => {
    if (cashAppPayEl.current) {
      cashAppInit(
        amount,
        paymentStatus.current,
        paymentAmount.current,
        paymentStatus.current,
        setStatus
      );
    }
  }, [amount]);

  useEffect(() => {
    if (status === "success") {
      idbPromise("appointments", "delete", { ...appointments });
      idbPromise("guest", "delete", { ...guestInfo });
      dispatch(setAppointment(null));
      dispatch(setGuest(null));
      navigate("/profile");
      return;
    }
    if (status === "failure") {
      navigate("/cashapp-error");
      return;
    }
  }, [status, dispatch, navigate, appointments, guestInfo]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center px-2'>
      <div className='mt-10 w-full max-w-md'>
        <h1 className='text-center p-5 text-xl font-bold'>
          Complete your Appointment
        </h1>
        <Card className='bg-base-300 mb-2 shadow-md'>
          <Card.Body className='w-full max-w-md'>
            <h1 className='text-xl font-bold'>Customer info</h1>
            <Divider className='p-0 m-0' />
            <div className='px-2 mb-3'>
              <p className='font-semibold'>
                Name: {guestInfo?.firstName} {guestInfo?.lastName}
              </p>
              <p className='font-semibold'>Email: {guestInfo?.email}</p>
              <p className='font-semibold'>Phone: {guestInfo?.phone}</p>
            </div>
          </Card.Body>
        </Card>
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
      </div>
    </div>
  );
};
export default CashApp;
