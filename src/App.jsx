import React from 'react';
import Navbar from './context/Navbar';
import Hero from './context/Hero';
import Footer from './context/Footer';
import SearchBar from './context/SearchBar';
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

