import { Divider, Card } from "react-daisyui";
import { useFetch } from "../hooks/useFetch";

const Services = () => {
  const { data, loading, error } = useFetch("/api/services");

  if (loading) {
    return (
      <div className='flex-1 flex'>
        <div className='flex w-full justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <progress className='progress progress-primary w-56'></progress>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className='flex w-full justify-center mt-10'>
      <div className='container mx-auto'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold text-center'>Services</h1>
        </div>
        <div className='flex mt-6 justify-center mb-16'>
          <div className='w-16 h-1 rounded-full bg-blue-500 inline-flex'></div>
        </div>
        <div className='flex flex-wrap'>
          {data?.map((service) => (
            <div key={service.id} className='w-full md:w-1/2 lg:w-4/12 p-2'>
              <Card className='bg-base-300'>
                <Card.Body>
                  <h1 className='text-2xl font-bold text-center mb-5'>
                    {service.itemData.name}
                  </h1>
                  <div className='flex flex-col'>
                    {service.itemData.variations.map((variation, index) => {
                      let price =
                        variation?.itemVariationData?.priceMoney?.amount;
                      const isLast =
                        index === service.itemData.variations.length - 1;
                      price = parseInt(price) / 100;
                      return (
                        <div key={index}>
                          <div>
                            <div className='flex justify-between'>
                              <h2>
                                {variation.itemVariationData.name}
                              </h2>
                              <p className='text-end'>${price}</p>
                            </div>
                          </div>
                          {!isLast && <Divider />}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
