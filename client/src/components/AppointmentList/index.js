import { Button, Divider } from "react-daisyui";
import { useState } from "react";
import RescheduleModal from "../RescheduleModal";

const AppointmentList = ({ appointment, onDelete, isLast }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    onDelete(appointment.id);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div key={appointment.id} className="px-2">
      <h2 className='mb-1 text-2xl font-bold'>
        {appointment.appointments[0].category}
      </h2>
      <div className='flex flex-wrap justify-between w-full'>
        <p className='text-lg font-bold'>
          {appointment.appointments[0].itemVariationData.name}
        </p>
        <p className='text-lg font-bold text-end'>
          $
          {appointment.appointments[0].itemVariationData.priceMoney.amount /
            100}
        </p>
      </div>
      <p className='text-lg font-bold mt-1'>
        {appointment.appointmentDate} at {appointment.appointmentTime}
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
    <RescheduleModal isOpen={visible} onClose={toggleVisible} service={appointment} staffId={appointment.creatorDetails.teamMemberId} />
    </div>
  );
};

export default AppointmentList;
