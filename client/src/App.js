import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./app/storeSlices/theme/themeSlice";
import { Theme } from "react-daisyui";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BookNow from "./pages/BookNow";
import Guest from "./pages/Guest";
import CashApp from "./pages/CashApp";
import CashAppSuccess from "./pages/CashAppSuccess";
import BookingSuccess from "./pages/BookingSuccess";
import Profile from "./pages/Profile";

function App() {
  const appTheme = useSelector(theme);

  return (
    <Theme dataTheme={appTheme}>
      <Router>
        <div className='min-h-screen flex flex-col justify-between'>
          <Navbar />
          <div className='flex-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/booknow' element={<BookNow />} />
              <Route path='/guest' element={<Guest />} />
              <Route path='/cashapp-pay' element={<CashApp />} />
              <Route path='/cashapp-success' element={<CashAppSuccess />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Theme>
  );
}

export default App;
