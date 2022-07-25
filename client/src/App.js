import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./features/theme/themeSlice";
import { Theme } from "react-daisyui";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const appTheme = useSelector(theme);

  return (
    <Theme dataTheme={appTheme}>
      <Router>
        <div className='min-h-screen flex flex-col justify-between'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Theme>
  );
}

export default App;
