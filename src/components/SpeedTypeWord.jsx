import React from "react";
import { Link } from "react-router-dom";

const SpeedType = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1>
        <p className="text-8xl mb-8 font-dokdo">
          <span className="text-blue-400">T</span>
          <span className="text-pink-400">I</span>
          <span className="text-teal-400">M</span>
          <span className="text-sky-400">E</span>
          &nbsp;
          <span className="text-lime-400">A</span>
          <span className="text-red-400">T</span>
          <span className="text-fuchsia-400">T</span>
          <span className="text-orange-400">A</span>
          <span className="text-red-400">C</span>
          <span className="text-cyan-400">K</span>
        </p>
      </h1>
      <div className="flex justify-center w-3/4 flex-wrap text-white">
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game3/easy/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28 bg-green-900 border-4 text-2xl font-bold border-green-500 rounded-xl"
          >
            Easy
          </Link>
        </div>
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game3/medium/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28 bg-blue-900 border-4 text-2xl font-bold border-blue-500 rounded-xl"
          >
            Medium
          </Link>
        </div>
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game3/hard/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28 bg-red-900 border-4 text-2xl font-bold border-red-500 rounded-xl"
          >
            Hard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpeedType;
