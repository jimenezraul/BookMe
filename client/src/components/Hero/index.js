import { Hero, Button } from "react-daisyui";
import { Link } from "react-router-dom";

const HeroSection = ({ title, subtitle, buttonName, link }) => {
  return (
    <Hero
      style={{
        backgroundImage: "url(assets/img/salon.jpg)",
      }}
      className='h-96 z-10 rounded-b-2xl overflow-hidden shadow-lg'
    >
      <Hero.Overlay />
      <Hero.Content className='text-center text-white'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>{title}</h1>
          <p className='py-6'>{subtitle}</p>
        {buttonName && (
            <Link to={link}>
              <Button color="primary" className='text-white font-bold text-lg border-0'>
                {buttonName}
              </Button>
            </Link>
          )}
        </div>
      </Hero.Content>
    </Hero>
  );
};

export default HeroSection;
