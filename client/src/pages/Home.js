import HeroSection from '../components/Hero';
import Location from '../components/Location';

const Services = [
  {
    title: 'Haircut & Styling',
    description:
      'Modern styling combined with precision cutting for Women, Men, and Children.',
    icon: '/assets/img/barber-shop.png',
  },
  {
    title: 'Coloting & Highlights',
    description:
      "Get the perfect Balayage, Ombre, highlights, or hair color, that you've always wanted.",
    icon: '/assets/img/hair-dye-kit.png',
  },
  {
    title: 'Hair Extensions',
    description:
      '100% human hair available in Hand Tied, Fusion, Tape-in or Clip-in hair extensions.',
    icon: '/assets/img/hair.png',
  },
];

const Home = () => {
  return (
    <div className='flex-1'>
      <HeroSection
        title='BOOK'
        span='ME'
        subtitle='A Booking System for Hair Salons and Barbershops'
        buttonName='BookNow'
        link='/booknow'
      />

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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
