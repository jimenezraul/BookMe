import { useFetch } from "../../hook/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Mask } from "react-daisyui";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const { data, loading, error } = useFetch("/api/staff");

  useEffect(() => {
    if (data) {
      setStaff(data.teamMemberBookingProfiles);
    }
  }, [data]);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className='flex flex-wrap justify-center w-full mb-5'>
      {loading && <progress className='progress w-56'></progress>}

      {staff?.map((staff, index) => (
        <div key={index} className='flex w-full md:w-1/2 p-2'>
          <div className='flex-1 card card-side bg-base-100 p- shadow-lg p-2 border border-base-300'>
            <div className='pl-3 avatar flex flex-col justify-center'>
              <div className='w-24 h-24 mask mask-squircle'>
                <img src={staff.profileImageUrl} alt={staff.displayName} />
              </div>
            </div>
            <div className='card-body'>
              <h2 className='card-title'>{staff.displayName}</h2>
              <p>{staff.description}</p>
              <div className='card-actions justify-end'>
                <Link to={`?staff=${staff.teamMemberId}`}>
                  <button className='btn btn-primary'>View Services</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Staff;
