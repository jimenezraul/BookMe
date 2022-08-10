import { Modal, Button } from "react-daisyui";
import Calendar from "../Calendar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setAppointment } from "../../app/storeSlices/appointments/appointmentSlice";
import { useDispatch } from "react-redux";
import BookTime from "../BookTime";
import Update from "../Update";
import { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";

const RescheduleModal = ({ isOpen, onClose, service, staffId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    if (isOpen) {
      dispatch(setAppointment({ ...service }));
      idbPromise("appointments", "put", {
        ...service,
      });
    }
  }, [service, isOpen, dispatch]);

  const handleClose = () => {
    idbPromise("appointments", "delete", {
      ...service,
    });
    navigate("/profile");
    onClose();
  };
  return (
    <Modal open={isOpen} className='w-full' onClickBackdrop={handleClose}>
      <Modal.Header className='relative text-xl font-bold text-center mb-5'>
        Reschedule
      </Modal.Header>
      <Button
        variant='outline'
        className='absolute top-4 right-4'
        onClick={handleClose}
      >
        Close
      </Button>
      <Modal.Body className='w-full'>
        {!date && (
          <Calendar
            staff={staffId}
            service={service.appointmentSegments[0].serviceVariationId}
          />
        )}
        {date && !time && (
          <BookTime
            staff={staffId}
            services={service.appointmentSegments[0].serviceVariationId}
            date={date}
            isModal
          />
        )}
        {date && time && <Update onClose={onClose} />}
      </Modal.Body>
    </Modal>
  );
};

export default RescheduleModal;
