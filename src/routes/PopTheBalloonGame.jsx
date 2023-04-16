import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillSound } from "react-icons/ai";
import Balloon from "../components/Balloon";

const PopTheBalloonGame = () => {
  const colors = ["red", "blue", "green", "yellow"];
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [color, setColor] = useState()
  const [letters, setLetters] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [startTimer, setStartTimer] = useState(3);
  const [timer, setTimer] = useState(100);
  const [score, setScore] = useState(0);
  const [random, setRandom] = useState(Math.random(Math.floor * (2)));
  const [key, setKey] = useState(null);

  const restartGame = () => {
    setLetters([]);
    setTimer(100);
    setEnd(false);
    setStart(true);
    setStartTimer(3);
    setScore(0)
  };

  const deleteElement = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
        return array;
      }
    }
  };

  const insertValue = (array, value) => {
    let newArray = array;
    if(newArray){
      newArray.push(value);
    }
    else{
      newArray = []
    }
    return newArray;
  };

  const checkLetter = (letter) => {
    let newLetters = letters
    for (let i = 0; i < letters.length; i++) {
      if (newLetters[i].letter === letter.toUpperCase() && newLetters[i].bg === "balloon.png") {
        newLetters[i].bg = "balloon-pop.gif"
        setLetters(newLetters)
        return newLetters[i];
      }
    }
    return false;
  };

  const decrementTimer = useCallback(() => {
    setTimer((oldTimer) => oldTimer - 1);
  }, []);

  const decrementStartTimer = useCallback(() => {
    setStartTimer((oldStartTimer) => oldStartTimer - 1);
  }, []);

  useEffect(() => {
    if (gameStart) {
      if (/^[A-Za-z]$/.test(key)) {
        const div = checkLetter(key);
        if (div) {
          setScore(score + 1)
          setKey(null)
          const timeoutFunction = setTimeout(() => {
              deleteElement(letters, div)
          }, 1000);
        }
      }
    }
  }, [key])
  

  useEffect(() => {
    if (startTimer < 0) {
      setGameStart(true);
      return;
    }
    if (start) {
      setColor(colors[startTimer]);
      const timeoutFunction = setInterval(decrementStartTimer, 1000);
      return () => clearInterval(timeoutFunction);
    }
  }, [decrementStartTimer, startTimer, start]);

  useEffect(() => {
    if (timer <= 0) {
      setEnd(true);
      setStart(false);
      setGameStart(false);
      return;
    }
    if (letters.length && timer === letters[0].timer && letters[0].bg === "balloon.png"){
      setLetters(deleteElement(letters, letters[0]))
    }
    if (start) {
      const timeoutFunction = setInterval(decrementTimer, 1000);
      return () => clearInterval(timeoutFunction);
    }
  }, [decrementTimer, timer, start]);

  useEffect(() => {
    if (gameStart) {
      const div = {
        letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        top: Math.floor(Math.random() * 18),
        left: Math.floor(Math.random() * 42),
        bg: "balloon.png",
        timer: timer - 5
      };
  
      setLetters(insertValue(letters, div));
    }
  }, [gameStart, timer, letters]);

  return (
    <div
      className="h-screen py-16 w-screen flex flex-col items-center justify-center bg-game-3-bg bg-cover"
      tabIndex="0"
      onKeyDown={(e) => {
        setKey(e.key);
      }}
    >
      {end ? (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-50 transition-all opacity-100 fixed flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
          <div className="px-20 py-10 rounded-3xl bg-[#EAECFF] flex flex-col justify-center items-center text-md text-[#2E2E2E] font-poppins">
            <p className="font-rampartone text-7xl mb-4">Congrats!</p>
            <p>
              Your score is: <span className="text-black">{score}</span>
            </p>
            <div className="w-full flex justify-between mt-8">
              <button
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
                onClick={() => restartGame()}
              >
                TRY AGAIN
              </button>
              <Link
                to="/"
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
              >
                MAIN MENU
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-50 opacity-0 transition-all fixed -z-50 items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
          <div className="px-20 py-10 rounded-3xl bg-[#EAECFF] flex flex-col justify-center items-center text-md text-[#2E2E2E] font-poppins">
            <p className="font-rampartone text-7xl mb-4">Congrats!</p>
            <p>
              Your score is: <span className="text-black">{score}</span>
            </p>
            <div className="w-full flex justify-between mt-8">
              <button
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
                onClick={() => restartGame()}
              >
                TRY AGAIN
              </button>
              <Link
                to="/"
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
              >
                MAIN MENU
              </Link>
            </div>
          </div>
        </div>
      )}
      {gameStart ? (
        <div className="px-16 w-full flex justify-between text-4xl font-bold text-gray-400 font-poppins tracking-widest">
          <div className="flex flex-col text-blue-400 items-center">
            SCORE
            <p className="text-6xl text-blue-500">{score}</p>
          </div>
          <div className="flex flex-col text-red-400 items-center">
            Timer
            <p className="text-6xl text-red-500">{timer}</p>
          </div>
        </div>
      ) : (
        <div className="px-16 w-full flex justify-between text-5xl text-gray-400">
          <Link
            to="/"
            className="hover:text-sky-300 transition-all ease-in-out"
          >
            <AiFillHome />
          </Link>
          <AiFillSound />
        </div>
      )}
      <div className="h-full flex flex-col justify-center items-center text-7xl ">
        <div className="font-knewave mb-12">
          <span className="text-blue-400">S</span>
          <span className="text-pink-400">p</span>
          <span className="text-teal-400">e</span>
          <span className="text-sky-400">e</span>
          <span className="text-lime-400">d</span>
          &nbsp;
          <span className="text-orange-400">T</span>
          <span className="text-red-400">y</span>
          <span className="text-green-400">p</span>
          <span className="text-purple-400">i</span>
          <span className="text-violet-400">n</span>
          <span className="text-yellow-400">g</span>
        </div>
        <div className="bg-balloon"></div>
        <div className="bg-balloon-pop"></div>
        {!gameStart ? (
          <div className={`font-knewave text-${color}-400`}>
            {startTimer === 0 ? (
              "GO!"
            ) : start ? (
              <div>{startTimer}</div>
            ) : (
              <button
                onClick={() => setStart(true)}
                className="shadow-xl text-7xl font-bold rounded-3xl px-20 py-2 bg-gradient-to-b from-yellow-200 to-orange-400 text-white font-raleway"
              >
                start
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white w-[48.5rem] h-[25rem] relative rounded-3xl">
            { letters &&
              letters.map((div, index) => {
                return (
                  <Balloon key={index} div={div}/>
                );
              })
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default PopTheBalloonGame;
