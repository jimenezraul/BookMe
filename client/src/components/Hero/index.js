import { Hero, Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { theme } from "../../app/storeSlices/theme/themeSlice";
import { useSelector } from "react-redux";

const HeroSection = ({ title, subtitle, buttonName, link, span }) => {
  const appTheme = useSelector(theme);
  const isDark = appTheme === "night";

  return (
    <Hero
      style={{
        backgroundImage: "url(assets/img/salon.jpg)",
      }}
      className='h-96 z-10 overflow-hidden shadow-lg'
    >
      <Hero.Overlay />
      <Hero.Content className='text-center text-white'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>
            {title}{" "}
            {span && (
              <span
                className={`${
                  isDark ? "bg-[#5fcfff]" : "bg-[#057AFF]"
                } rounded-lg px-2`}
              >
                {span}
              </span>
            )}
          </h1>
          <p className='py-6 font-semibold'>{subtitle}</p>
          {buttonName && (
            <Link to={link}>
              <Button
                color='primary'
                className='text-white font-bold text-lg border-0'
              >
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
