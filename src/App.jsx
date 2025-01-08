import React from "react";
import Navbar from "./components/user/navbar/navbar";
import Hero from "./context/Hero";
import Footer from "./context/Footer";
import SearchBar from "./components/user/navbar/searchBar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
