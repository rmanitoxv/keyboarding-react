import React from 'react'
import { Link } from "react-router-dom";

function SpeedTypeParagraph() {
  return (
    <div className="flex flex-col justify-center items-center py-60">
      <h1>
        <p className="text-8xl mb-8">Speed Typing Paragraph</p>
      </h1>
      <div className="flex justify-center w-full">
        <Link to="/game4/easy/" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center text-white">
            Easy
          </div>
        </Link>
        <Link to="/game4/medium/" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center text-white">
            Medium
          </div>
        </Link>
        <Link to="/game4/hard/" className="mx-8">
          <div className="h-24 w-24 bg-black flex justify-center items-center text-white">
            Hard
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SpeedTypeParagraph