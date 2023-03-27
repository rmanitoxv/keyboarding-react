import React from "react";
import { Link } from "react-router-dom";

function Basics() {
  return (
    <div className="flex flex-col justify-center items-center py-60">
      <h1>
        <p className="text-8xl mb-8">BASICS</p>
      </h1>
      <div className="flex justify-center w-full text-white">
        <Link to="/basics/1" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">1</div>
        </Link>
        <Link to="/basics/2" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">2</div>
        </Link>
        <Link to="/basics/3" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">3</div>
        </Link>
        <Link to="/basics/4" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">4</div>
        </Link>
        <Link to="/basics/5" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">5</div>
        </Link>
        <Link to="/basics/6" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">6</div>
        </Link>
        <Link to="/basics/7" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center">7</div>
        </Link>
      </div>
    </div>
  );
}

export default Basics;
