import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../app/storeSlices/theme/themeSlice";
import { useSelector } from "react-redux";

const Staff = () => {
  const isDark = useSelector(theme);
  const [staff, setStaff] = useState([]);
  const { data, loading, error } = useFetch("/api/staff");
  const imgUrl =
    "https://appointments-production.s3.amazonaws.com/files/e7ceafb2589e2fd475dd20730fd1aebf/original.png";

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
      {loading && (
        <progress className='progress progress-primary w-56'></progress>
      )}

      {staff?.map((staff, index) => (
        <div key={index} className='flex w-full md:w-1/2 p-2'>
          <div className='flex-1 card card-side bg-base-100 p- shadow-lg p-2 border border-base-300'>
            <div className='pl-3 avatar flex flex-col justify-center'>
              <div className='w-24 h-24 mask mask-squircle'>
                <img
                  src={staff.profileImageUrl ? staff.profileImageUrl : imgUrl}
                  alt={staff.displayName}
                  className={
                    isDark === "night" ? "bg-slate-600" : "bg-slate-200"
                  }
                />
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
