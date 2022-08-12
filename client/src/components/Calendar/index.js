import Calendar from "react-calendar";
import { Card } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { datePast } from "../../utils/helpers";
const date = require("date-and-time");
require("./styles.css");

const BookCalendar = ({ staff, service }) => {
  const navigate = useNavigate();

  const dateSelection = (e) => {
    // format date to YYYY-MM-DD
    const formattedDate = date.format(e, "YYYY-MM-DD");
    navigate(`?staff=${staff}&services=${service}&date=${formattedDate}`);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex-1 w-full sm:w-10/12 md:w-8/12 lg:w-1/2'>
        <Card className='bg-base-300 p-5 rounded-xl mt-2'>
          <Card.Body className='p-0'>
            <div>
              <Calendar
                className='text-center'
                onChange={(e) => dateSelection(e)}
                tileDisabled={datePast}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default BookCalendar;
