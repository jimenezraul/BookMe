import { Button, Divider } from "react-daisyui";
import { useState } from "react";
import RescheduleModal from "../RescheduleModal";
import { deleteBooking } from "../../api/deleteBooking";
import { useSelector, useDispatch } from "react-redux";
import { setBooking, booking } from "../../app/storeSlices/booking/bookingSlice";

const AppointmentList = ({ appoint, isLast }) => {
  const dispatch = useDispatch();
  const appointments = useSelector(booking);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const id = appoint.id;
    const response = await deleteBooking(id);

    if (response) {
      const newData = appointments.filter(
        (appointment) => appointment.id !== id
      );
      dispatch(setBooking(newData));
    }
    setLoading(false);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div key={appoint.id} className='px-2'>
      <h2 className='mb-1 text-2xl font-bold'>
        {appoint.appointments[0].category}
      </h2>
      <div className='flex flex-wrap justify-between w-full'>
        <p className='text-lg font-bold'>
          {appoint.appointments[0].itemVariationData.name}
        </p>
        <p className='text-lg font-bold text-end'>
          ${appoint.appointments[0].itemVariationData.priceMoney.amount / 100}
        </p>
      </div>
      <p className='text-lg font-bold mt-1'>
        {appoint.appointmentDate} at {appoint.appointmentTime}
      </p>
      <p className='mt-1 text-sm font-bold'>
        Staff: {appoint.barber.displayName}
      </p>
      <div className='flex flex-wrap justify-end space-x-3 mt-5'>
        <Button onClick={toggleVisible} variant='outline'>
          Reschedule
        </Button>
        <Button
          onClick={handleDelete}
          className='text-white border-0 bg-red-600 hover:bg-red-800'
          loading={loading}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
      {!isLast && <Divider />}
      <RescheduleModal
        isOpen={visible}
        onClose={toggleVisible}
        service={appoint}
        staffId={appoint.creatorDetails.teamMemberId}
      />
    </div>
  );
};

export default AppointmentList;
