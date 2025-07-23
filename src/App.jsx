import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { HashLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen bg-black flex items-center justify-center">
          <HashLoader color="#ffffffa2" size={60} />
        </div>
      ) : (
        <>
          <Nav />
          <Hero />
        </>
      )}
    </>
  );
}

export default App;
