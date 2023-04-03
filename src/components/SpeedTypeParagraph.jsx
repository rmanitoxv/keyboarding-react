import React from "react";
import { Link } from "react-router-dom";

const SpeedTypeParagraph = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1>
        <p className="text-8xl mb-8 font-dokdo">
          <span className="text-blue-400">S</span>
          <span className="text-pink-400">P</span>
          <span className="text-teal-400">E</span>
          <span className="text-sky-400">E</span>
          <span className="text-lime-400">D</span>
          &nbsp;
          <span className="text-red-400">T</span>
          <span className="text-fuchsia-400">Y</span>
          <span className="text-orange-400">P</span>
          <span className="text-red-400">I</span>
          <span className="text-cyan-400">N</span>
          <span className="text-amber-400">G</span>
        </p>
      </h1>
      <div className="flex justify-center w-3/4 flex-wrap text-white">
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game4/easy/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28  bg-green-900 border-4 text-4xl font-bold border-green-500 rounded-xl"
          >
            60
            <br />
            sec
          </Link>
        </div>
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game4/medium/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28  bg-blue-900 border-4 text-4xl font-bold border-blue-500 rounded-xl"
          >
            30
            <br />
            sec
          </Link>
        </div>
        <div className="basis-1/4 my-4 flex justify-center items-center">
          <Link
            to="/game4/hard/"
            className="font-montserrat text-center flex justify-center items-center w-28 h-28  bg-red-900 border-4 text-4xl font-bold border-red-500 rounded-xl"
          >
            15
            <br />
            sec
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpeedTypeParagraph;
