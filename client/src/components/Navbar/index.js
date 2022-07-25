import { Button, Navbar, Form, Toggle, Dropdown } from "react-daisyui";
const { Link } = require("react-router-dom");
const { useState, useRef } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { theme, setTheme } = require("../../features/theme/themeSlice");

const Menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "BookNow",
    path: "/booknow",
  },
  {
    name: "Locations",
    path: "/locations",
  },
  {
    name: "Services",
    path: "/services",
  },
];

const AppNavbar = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(theme);
  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(appTheme === "night");

  const handleThemeChange = () => {
    setIsDark(!isDark);
    dispatch(setTheme(isDark ? "winter" : "night"));
  };

  return (
    <div
      className={`flex w-full component-preview items-center justify-center gap-2 font-sans ${
        isDark && "bg-slate-800"
      } shadow-lg`}
    >
      <Navbar>
        <Navbar.Start>
          <Dropdown>
            <Button color='ghost' shape='circle' tabIndex={0}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </Button>
            <Dropdown.Menu
              tabIndex={0}
              className={`menu-compact w-52 border ${
                isDark && "border-slate-900 bg-slate-800"
              }  shadow-lg`}
            >
              {Menus.map((menu, index) => (
                <Dropdown.Item
                  key={index}
                  tabIndex={0}
                  onClick={() => setActive(index)}
                  as={Link}
                  to={menu.path}
                >
                  {menu.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Start>
        <Navbar.Center>
          <Button color='ghost' className='normal-case text-xl'>
            Salon - BarberShop
          </Button>
        </Navbar.Center>
        <Navbar.End className='navbar-end'>
          <div className='flex-none gap-2'>
            <Dropdown vertical='end'>
              <Button color='ghost' className='avatar' shape='circle'>
                <div className='w-10 rounded-full'>
                  <img src='https://api.lorem.space/image/face?hash=33791' />
                </div>
              </Button>
              <Dropdown.Menu
                className={`w-52 menu-compact shadow-lg border ${
                  isDark && "border-slate-900 bg-slate-800"
                }`}
              >
                <li>
                  <Link
                    to='/profile'
                    className={`justify-between ${
                      active === 4 && "bg-base-200"
                    }`}
                    onClick={() => setActive(4)}
                  >
                    Profile
                  </Link>
                </li>
                <Dropdown.Item>Logout</Dropdown.Item>
                <Form className='bg-base-200 p-2 rounded-lg shadow'>
                  <Form.Label title='DarkMode'>
                    <Toggle
                      className={`m-2 ${isDark && "bg-blue-700"}`}
                      checked={isDark}
                      onChange={handleThemeChange}
                    />
                  </Form.Label>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
