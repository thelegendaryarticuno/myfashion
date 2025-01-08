import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router
import Navbar from "./components/user/navbar/navbar";
import Hero from "../src/pages/user/hero";
import Footer from "./components/user/Footer/Footer";
import Shop from "./pages/user/shop";
import ContactUs from "./pages/user/contactus";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Add routes for different pages */}
          <Route path="/" element={<Hero />} />
          <Route path="/shop" element={<Shop></Shop>} />{" "}
          <Route path="contact" element={<ContactUs></ContactUs>} />{" "}
          <Route path="signup" element={<Signup></Signup>} />{" "}
          <Route path="login" element={<Login></Login>} />{" "}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
