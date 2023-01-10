import { useAutoHide } from "auto-hide-hook";
import { Button, Navbar, Form, Toggle, Dropdown } from "react-daisyui";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const { useState, useRef, useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { theme, setTheme } = require("../../app/storeSlices/theme/themeSlice");

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
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const appTheme = useSelector(theme);
  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(appTheme === "night");

  // get the current url path
  const pathName = window.location.pathname;

  useEffect(() => {
    const index = Menus.findIndex((item) => item.path === pathName);
    setActive(index === -1 ? 4 : index);
  }, [pathName]);

  useAutoHide(menuRef, setIsOpen);
  useAutoHide(profileRef, setIsProfileOpen);

  const handleThemeChange = () => {
    setIsDark(!isDark);
    dispatch(setTheme(isDark ? "winter" : "night"));
  };

  const handleMenuClick = (index) => {
    setActive(index);
    setIsOpen(false);
  };

  const handleProfileClick = (index) => {
    setActive(index);
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div
      className={`flex w-full component-preview items-center justify-center gap-2 font-sans ${
        isDark && "bg-slate-800"
      } shadow-lg`}
    >
      <Navbar className='container'>
        <Navbar.Start>
          <div ref={menuRef} className='z-50'>
            <Button
              color='ghost'
              shape='circle'
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <svg
                  className='swap-off fill-current transition-all duration-200 rotate-180'
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 512 512'
                >
                  <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
                </svg>
              ) : (
                <svg
                  className='swap-on fill-current transition-all duration-200'
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 512 512'
                >
                  <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
                </svg>
              )}
            </Button>
            <div
              onToggle={() => setIsOpen(!isOpen)}
              className={`${
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-96"
              } absolute top-16 transition-all duration-200`}
            >
              <ul
                className={`flex space-y-2 dropdown-content menu p-2 right-0 rounded-lg w-52 menu-compact shadow-lg border ${
                  isDark ? "border-slate-900 bg-slate-800" : "bg-white"
                }`}
              >
                {Menus.map((menu, index) => (
                  <li key={index}>
                    <Link
                      to={menu.path}
                      onClick={() => handleMenuClick(index)}
                      className={`text-lg md:text-sm p-0 ${
                        active === index && "font-bold text-white"
                      }`}
                    >
                      <Button
                        color={`${active === index ? "primary" : "ghost"}`}
                        className='flex justify-start w-full'
                      >
                        {menu.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Navbar.Start>
        <Navbar.End className='navbar-end relative'>
          <div className='flex-none gap-2' ref={profileRef}>
            <Button
              color='ghost'
              className='avatar'
              shape='circle'
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className='w-10 rounded-full'>
                <img
                  src={
                    isAuthenticated ? user.picture : "/assets/img/user-logo.png"
                  }
                  alt={isAuthenticated ? user.name : "User Avatar"}
                  referrerPolicy='no-referrer'
                />
              </div>
            </Button>
            <div
              className={`absolute right-0 top-14 z-50 ${
                isProfileOpen ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-96"
              } transition-all duration-400`}
            >
              <Dropdown.Menu
                className={`bg-white rounded-lg w-52 menu-compact shadow-lg border ${
                  isDark && "border-slate-900 bg-slate-800"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <Form className='p-2'>
                      <Form.Label
                        title={user.given_name + " " + user.family_name}
                        className='font-bold'
                      ></Form.Label>
                    </Form>
                    <li>
                      <Link
                        to='/profile'
                        className={`p-0 text-lg md:text-sm ${
                          active === 4 && "font-bold text-white"
                        }`}
                        onClick={() => handleProfileClick(4)}
                      >
                        <Button
                          color={`${active === 4 ? "primary" : "ghost"}`}
                          className='flex justify-start w-full'
                        >
                          Profile
                        </Button>
                      </Link>
                    </li>
                    <Dropdown.Item
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      LOGOUT
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item
                    className='font-bold'
                    onClick={() => loginWithPopup()}
                  >
                    LOGIN
                  </Dropdown.Item>
                )}

                <Form className='bg-base-200 rounded-lg shadow'>
                  <Form.Label>
                    {isDark ? (
                      <svg
                        className='swap-on fill-current w-8 h-8'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
                      </svg>
                    ) : (
                      <svg
                        className='swap-off fill-current w-8 h-8'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
                      </svg>
                    )}
                    <Toggle
                      className={`m-2 ${isDark && "bg-blue-700"}`}
                      checked={isDark}
                      onChange={handleThemeChange}
                    />
                  </Form.Label>
                </Form>
              </Dropdown.Menu>
            </div>
          </div>
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
