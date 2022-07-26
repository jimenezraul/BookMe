import { Hero, Button } from "react-daisyui";

const Home = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className="container">
        <Hero
          style={{
            backgroundImage:
                          "url(https://api.lorem.space/image/fashion?w=1000&h=800)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundAttachment: "fixed",
                  }}
                  className="h-96 flex flex-1 justify-center items-center"
        >
          <Hero.Overlay />
          <Hero.Content className='text-center'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>Hello there</h1>
              <p className='py-6'>
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>

              <Button color='primary' className="font-bold text-lg">BookNow</Button>
            </div>
          </Hero.Content>
        </Hero>
      </div>
    </div>
  );
};

export default Home;
