import { Divider, Card } from "react-daisyui";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";

const photos = [
  {
    url: "/assets/haircuts/blowdry.jpg",
    alt: "blowdry",
  },
  {
    url: "/assets/haircuts/fade.jpg",
    alt: "fade",
  },
  {
    url: "/assets/haircuts/hairstyle.jpg",
    alt: "hairstyle",
  },
  {
    url: "/assets/haircuts/scissorcut.jpg",
    alt: "scissorcut",
  },
];

const Services = () => {
  const { data, loading, error } = useFetch("/api/services");

  if (loading) {
    return (
      <div className='flex-1 flex'>
        <div className='flex w-full justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <Loading />
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
          <h1 className='text-3xl font-bold text-center'>Our Services</h1>
        </div>
        <div className='flex mt-6 justify-center mb-5 md:mb-10'>
          <div className='w-16 h-1 rounded-full bg-blue-500 inline-flex'></div>
        </div>
        <div className='flex flex-wrap'>
          <div className='flex flex-col w-full md:w-1/2 p-1 space-y-2'>
            {data?.map((service) => (
              <div key={service.id} className='w-full'>
                <Card className='bg-base-300 shadow-md'>
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
                                <h2>{variation.itemVariationData.name}</h2>
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
          <div className='hidden md:block md:w-1/2 p-1'>
            <Card className='bg-base-300 shadow-md'>
              <Card.Body>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img src={photo.url} alt={photo.alt} className='w-full rounded-2xl shadow' />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
