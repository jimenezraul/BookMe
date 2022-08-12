import Location from "../components/Location";
import { Button } from "react-daisyui";

const Locations = () => {
  return (
    <div className='flex w-full justify-center'>
      <section
        id='location'
        className='text-gray-600 body-font w-full max-w-5xl'
      >
        <div className='container py-24 mx-auto'>
          <h1 className='text-center sm:text-3xl text-2xl font-medium title-font text-base-400 mb-4'>
            Our Location
          </h1>
          <div className='flex mt-6 justify-center mb-16'>
            <div className='w-16 h-1 rounded-full bg-blue-500 inline-flex'></div>
          </div>
          <Location />
          <div className='w-full flex justify-center mt-10'>
            <a href='https://www.google.com/maps/place/The+White+House,+1600+Pennsylvania+Avenue+NW,+Washington,+DC+20500/@38.8976675,-77.0387626,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7b7bce1485b19:0x9fc7bf09fd5d9daf!8m2!3d38.8976633!4d-77.0365739'>
              <Button color='primary'>Get Directions</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Locations;
