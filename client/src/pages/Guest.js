import HeroSection from "../components/Hero";
import { Button,Input } from "react-daisyui";
import { useState, useEffect } from "react";
import { validation, formatPhoneNumber } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setGuest } from "../app/storeSlices/guest/guestSlice";
import {
  setAppointment,
  appointment,
} from "../app/storeSlices/appointments/appointmentSlice";
import { useNavigate } from "react-router-dom";
import { idbPromise } from "../utils/helpers";
import Payments from "../components/Payments";
import { v4 as uuid } from "uuid";

const Guest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedService = useSelector(appointment);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    async function handleAppointment() {
      const appointLocal = await idbPromise("appointments", "get");

      if (appointLocal.length > 0) {
        dispatch(setAppointment(appointLocal[0]));
        return;
      }
      navigate("/booknow");
    }
    handleAppointment();
  }, [navigate, dispatch]);

  useEffect(() => {
    async function handleGuest() {
      const guestLocal = await idbPromise("guest", "get");
      if (guestLocal.length > 0) {
        guestLocal.forEach((guest) => {
          idbPromise("guest", "delete", { ...guest });
        });
      }
      const payment = await idbPromise("payment", "get");
      if (payment.length > 0) {
        payment.forEach((pay) => {
          idbPromise("payment", "delete", { ...pay });
        });
      }
    }
    handleGuest();
  }, []);

  const [formData, setFormData] = useState({
    id: uuid(),
    given_name: "",
    family_name: "",
    email: "",
    phoneNumber: "",
  });

  const handleValidation = (e) => {
    const { name, value } = e.target;
    const error = validation(value, name);
    setFormData({ ...formData, [name]: value, error });
  };

  const phoneHandler = (e) => {
    const phone = formatPhoneNumber(e.target.value, formData.phoneNumber);

    setFormData({
      ...formData,
      phoneNumber: phone,
    });
  };

  const handleCancel = () => {
    idbPromise("appointments", "delete", { ...selectedService });
    dispatch(setAppointment(null));
    navigate("/booknow");
  };

  const onSubmit = async (e) => {
    // prevent default action
    e.preventDefault();
    // for each key in formData, check if there is an error
    for (const key in formData) {
      const isValid = validation(formData[key], key);
      if (isValid) {
        setFormData({ ...formData, error: isValid });
        return;
      }
    }
    // if no error, send data to server
    await idbPromise("guest", "put", { ...formData });
    dispatch(setGuest(formData));
    setPayment(true);
  };

  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='container mx-auto'>
        <HeroSection title='Book as Guest' />
      </div>
      {!payment ? (
        <div className='w-full max-w-sm p-3'>
          <form
            onSubmit={(e) => onSubmit(e)}
            className='flex flex-col space-y-3 bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5'
          >
            <h1 className='text-2xl font-bold mb-2'>Guest Info</h1>
            <div>
              <Input className="w-full" name="given_name" onBlur={handleValidation} placeholder='First Name'/>
            </div>
            <div>
              <Input
                className='w-full'
                name='family_name'
                onBlur={handleValidation}
                type='text'
                placeholder='Last Name'
              />
            </div>
            <div>
              <Input
                className='w-full'
                name='email'
                onBlur={handleValidation}
                type='email'
                placeholder='Email'
              />
            </div>
            <div>
              <Input
                className='w-full'
                name='phoneNumber'
                onBlur={handleValidation}
                onChange={(e) => phoneHandler(e)}
                value={formData.phoneNumber}
                type='tel'
                placeholder='Phone Number'
              />
            </div>
            <p className='text-red-600'>{formData.error && formData.error}</p>
            <div className='flex items-center justify-end space-x-2'>
              <Button
                type='button'
                className='flex flex-1 border-0 text-white bg-red-500 hover:bg-red-700'
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button
                color='primary'
                className='flex flex-1 text-white'
                type='submit'
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className='w-full'>
          <Payments />
        </div>
      )}
    </div>
  );
};
export default Guest;
