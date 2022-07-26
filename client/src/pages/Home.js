import { Hero, Button } from "react-daisyui";

const Home = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container'>
        <Hero
          style={{
            backgroundImage: "url(assets/img/salon.jpg)",
          }}
          className='h-96'
        >
          <Hero.Overlay />
          <Hero.Content className='text-center text-white backdrop-blur-sm shadow rounded-lg border border-gray-400'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>Welcome</h1>
              <p className='py-6'>
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>

              <Button color='primary' className='font-bold text-lg'>
                BookNow
              </Button>
            </div>
          </Hero.Content>
        </Hero>
      </div>
    </div>
  );
};

export default Home;
