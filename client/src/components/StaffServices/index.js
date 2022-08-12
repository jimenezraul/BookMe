import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Divider } from "react-daisyui";
import { useDispatch } from "react-redux";
import { setAppointment } from "../../app/storeSlices/appointments/appointmentSlice";
import { idbPromise } from "../../utils/helpers";
import { useEffect } from "react"; 
import Loading from "../Loading";

const StaffServices = ({ staff }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/api/services/${staff}`);

  useEffect(() => {
    // if idb is not empty, fetch from idb and delete from idb
    async function handleAppointment() {
      const appointLocal = await idbPromise("appointments", "get");

      if (appointLocal.length > 0) {
        appointLocal.forEach((appointment) => {
          idbPromise("appointments", "delete", { ...appointment });
        });
      }
    }
    handleAppointment();
  }, []);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className='staff-services'>
      <div className='container'>
        <div className='flex flex-wrap w-full mb-5 justify-center'>
          {loading && (
            <Loading />
          )}
          {data?.map((service, index) => (
            <div key={index} className='w-full md:w-1/2 p-1'>
              <div className='flex-1 card card-side bg-base-300 shadow-lg border border-base-300'>
                <div className='card-body'>
                  <h2 className='text-center text-2xl font-bold'>
                    {service.itemData.name}
                  </h2>
                  <Divider></Divider>
                  {service.itemData.variations.map((variation, index) => {
                    let price =
                      variation?.itemVariationData?.priceMoney?.amount;
                    const isLast =
                      index === service.itemData.variations.length - 1;
                    price = parseInt(price) / 100;
                    return (
                      <div key={index}>
                        <div>
                          <div className='card-actions flex justify-between pb-5'>
                            <h2 className='card-title'>
                              {variation.itemVariationData.name}
                            </h2>
                            <p className='text-end'>${price}</p>
                          </div>
                          <div className='w-full card-actions justify-end'>
                            <Link
                              onClick={() =>
                                dispatch(
                                  setAppointment({
                                    ...variation,
                                    category: service.itemData.name,
                                    price: price,
                                  })
                                )
                              }
                              to={`?staff=${staff}&services=${variation.id}`}
                            >
                              <button className='btn btn-primary'>
                                Book Now
                              </button>
                            </Link>
                          </div>
                        </div>
                        {!isLast && <Divider />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StaffServices;
