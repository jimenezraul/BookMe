import { Hero, Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { theme } from "../features/theme/themeSlice";
import { useSelector } from "react-redux";

const Services = [
  {
    title: "Haircut & Styling",
    description:
      "Modern styling combined with precision cutting for Women, Men, and Children.",
    icon: "/assets/img/barber-shop.png",
  },
  {
    title: "Coloting & Highlights",
    description:
      "Get the perfect Balayage, Ombre, highlights, or hair color, that you've always wanted.",
    icon: "/assets/img/hair-dye-kit.png",
  },
  {
    title: "Hair Extensions",
    description:
      "100% human hair available in Hand Tied, Fusion, Tape-in or Clip-in hair extensions.",
    icon: "/assets/img/hair.png",
  },
];

const Home = () => {
  const [locations, setLocations] = useState([]);
  const appTheme = useSelector(theme);
  const [isDark, setIsDark] = useState(appTheme === "night");

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations));
  }, []);

  useEffect(() => {
    setIsDark(appTheme === "night");
  }, [appTheme]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <Hero
          style={{
            backgroundImage: "url(assets/img/salon.jpg)",
          }}
          className='h-96 z-10 rounded-b-2xl overflow-hidden shadow-lg'
        >
          <Hero.Overlay />
          <Hero.Content className='text-center text-white'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>NextLevel Studio</h1>
              <p className='py-6'>A Unisex Salon in the heart of the city.</p>
              <Button className='text-white font-bold text-lg bg-blue-700 hover:bg-blue-800 border-0'>
                BookNow
              </Button>
            </div>
          </Hero.Content>
        </Hero>
      </div>

      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-16 mx-auto'>
          <div className='text-center mb-20'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font text-base-400 mb-4'>
              Our Services
            </h1>
            <div className='flex mt-6 justify-center'>
              <div className='w-16 h-1 rounded-full bg-blue-500 inline-flex'></div>
            </div>
          </div>
          <div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6'>
            {Services.map((service, index) => (
              <div
                key={index}
                className='p-4 md:w-1/3 flex flex-col text-center items-center'
              >
                <div className='w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0'>
                  <img
                    className='w-12 filter sepia'
                    src={service.icon}
                    alt=''
                  />
                </div>
                <div className='flex-grow'>
                  <h2 className='text-base-400  text-lg title-font font-medium mb-3'>
                    {service.title}
                  </h2>
                  <p className='leading-relaxed text-base'>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='text-gray-600 body-font w-full'>
        <div className='container py-24 mx-auto'>
          <h1 className='text-center sm:text-3xl text-2xl font-medium title-font text-base-400 mb-4'>
            Our Locations
          </h1>
          <div className='flex mt-6 justify-center mb-16'>
            <div className='w-16 h-1 rounded-full bg-blue-500 inline-flex'></div>
          </div>
          <div className='flex flex-wrap'>
            {locations.map((location, index) => {
              const isLast = index === locations.length - 1;

              return (
                <div
                  key={index}
                  className='p-2 flex w-10/12 md:w-4/12 justify-center mx-auto'
                >
                  <div
                    className={`flex-1 pt-6 px-4 flex justify-center text-center rounded-xl shadow-lg  border ${
                      isDark ? "bg-slate-800 border-slate-700" : "bg-gray-100"
                    } ${
                      !isLast && "border-b"
                    } pb-10 md:pb-6 mb-10 border-gray-200`}
                  >
                    <div className='flex-grow text-center mt-6 sm:mt-0'>
                      <h1 className='text-slate-500 text-2xl title-font font-medium mb-2'>
                        {location.businessName}
                      </h1>
                      <p className='leading-relaxed text-slate-500'>
                        {location.address.addressLine1},{" "}
                        {location.address.locality}{" "}
                        {location.address.administrativeDistrictLevel1}{" "}
                        {location.address.postalCode}
                      </p>
                      {/* phone number */}
                      <a href={`tel:${location.phoneNumber}`}>
                        <p className='leading-relaxed text-slate-500 mb-3 font-semibold'>
                          {location.phoneNumber}
                        </p>
                      </a>
                      <div className='leading-relaxed text-slate-500'>
                        <h2 className='font-bold text-lg'>Business Hours</h2>
                        {location.businessHours.periods.map((period, index) => (
                          <div key={index}>
                            <p>
                              {period.dayOfWeek} - {period.open} -{" "}
                              {period.close}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
