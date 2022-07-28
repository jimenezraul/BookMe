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
  console.log(staff);
  return (
    <div>
      {loading && <progress className='progress w-56'></progress>}

      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {staff?.map((staff, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th></th>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img
                            src={staff.profileImageUrl}
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{staff.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{staff.description}</td>
                  <th>
                    <Link to={`/booknow?staff=${staff.teamMemberId}`}>
                      <button className='btn btn-ghost btn-md'>Select</button>
                    </Link>
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Staff;
