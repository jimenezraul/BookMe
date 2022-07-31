import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Divider } from "react-daisyui";
import { useDispatch } from "react-redux";
import { setAppointment } from "../../features/appointments/appointmentSlice";

const StaffServices = ({ staff }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/api/services/${staff}`);
  if (error) {
    return <div>Error!</div>;
  }
  console.log(data);
  return (
    <div className='staff-services'>
      <div className='container'>
        <div className='flex flex-wrap justify-center w-full mb-5'>
          {loading && <progress className='progress w-56'></progress>}
          {data?.map((service, index) => (
            <div key={index} className='flex w-full md:w-1/2 p-2'>
              <div className='flex-1 card card-side bg-base-100 p- shadow-lg border border-base-300'>
                <div className='card-body'>
                  <h2 className='card-title'>{service.itemData.name}</h2>
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
