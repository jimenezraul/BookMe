import {
  appointment,
  setAppointment,
} from "../../features/appointments/appointmentSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { idbPromise } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { Divider } from "react-daisyui";

const { useSelector, useDispatch } = require("react-redux");

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(appointment);
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      idbPromise("appointments", "get").then((data) => {
        dispatch(setAppointment(data[0]));
      });
    }
  }, [data, dispatch]);

  const cancelHandler = () => {
    idbPromise("appointments", "delete", { ...data });
    dispatch(setAppointment({}));
    navigate("/booknow");
  };

  console.log(data);
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
              <button
                onClick={cancelHandler}
                className='btn bg-red-500 border-0 hover:bg-red-800 text-white'
              >
                Cancel
              </button>

              <Link to=''>
                <button className='btn btn-primary'>Confirm</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
