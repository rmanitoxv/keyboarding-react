import React from "react";
import { Link } from "react-router-dom";

function Basics() {
  return (
    <div className="flex flex-col justify-center items-center py-60">
      <h1>
        <p className="text-8xl mb-8">BASICS</p>
      </h1>
      <div className="flex justify-center w-full">
        <Link to="#" className="mx-8">
          <div className="h-24 w-24 bg-black"></div>
        </Link>
        <Link to="#" className="mx-8">
          <div className="h-24 w-24 bg-black"></div>
        </Link>
        <Link to="#" className="mx-8">
          <div className="h-24 w-24 bg-black"></div>
        </Link>
        <Link to="#" className="mx-8">
          <div className="h-24 w-24 bg-black"></div>
        </Link>
        <Link to="#" className="mx-8">
          <div className="h-24 w-24 bg-black"></div>
        </Link>
      </div>
    </div>
  );
}

export default Basics;
