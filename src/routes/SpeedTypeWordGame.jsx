import React, { useCallback, useEffect, useState } from "react";
import random from "random-words";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillSound } from "react-icons/ai";

const colors = ["red", "blue", "green", "yellow"];
let color = "red";

const SpeedTypeGame = () => {
  let { id } = useParams();
  let timeIncrement = 0;
  if (id === "easy") {
    timeIncrement = 3;
  } else if (id === "medium") {
    timeIncrement = 2;
  } else if (id === "hard") {
    timeIncrement = 1;
  }

  const [Key, setKey] = useState("");
  const [Word, setWord] = useState(random());
  const [Timer, setTimer] = useState(20);
  const [StartTimer, setStartTimer] = useState(3);
  const [Score, setScore] = useState(0);
  const [End, setEnd] = useState(false);
  const [Start, setStart] = useState(false);
  const [GameStart, setGameStart] = useState(false);

  const decrementTimer = useCallback(() => {
    setTimer((oldTimer) => oldTimer - 1);
  }, []);

  const decrementStartTimer = useCallback(() => {
    setStartTimer((oldStartTimer) => oldStartTimer - 1);
  }, []);

  useEffect(() => {
    if (Timer <= 0) {
      setEnd(true);
      setGameStart(false);
      setStart(false);
      setStartTimer(3);
      return;
    }
    if (GameStart) {
      const timeoutFunction = setInterval(decrementTimer, 1000);
      return () => clearInterval(timeoutFunction);
    }
  }, [decrementTimer, Timer, GameStart]);

  let go = null;

  useEffect(() => {
    if (StartTimer < 0) {
      setGameStart(true);
      return;
    }
    if (Start) {
      color = colors[StartTimer];
      const timeoutFunction = setInterval(decrementStartTimer, 1000);
      return () => clearInterval(timeoutFunction);
    }
  }, [decrementStartTimer, StartTimer, Start]);

  useEffect(() => {
    if (Key.toLocaleLowerCase() === Word.toLocaleLowerCase()) {
      setKey("");
      setWord(random());
      setTimer(Timer + timeIncrement >= 60 ? 60 : Timer + timeIncrement);
      setScore(Score + 1);
    }
  }, [Key]);

  const restartGame = () => {
    setEnd(false);
    setStartTimer(3);
    setTimer(20);
    setScore(0);
    setStart(true);
  };

  return (
    <div className="h-screen py-16 w-screen flex flex-col items-center justify-center bg-game-3-bg bg-cover">
      {End ? (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-50 transition-all opacity-100 fixed flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
          <div className="px-20 py-10 rounded-3xl bg-[#EAECFF] flex flex-col justify-center items-center text-md text-[#2E2E2E] font-poppins">
            <p className="font-rampartone text-7xl mb-4">Congrats!</p>
            <p>
              Your score is: <span className="text-black">{Score}</span>
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
              Your score is: <span className="text-black">{Score}</span>
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
      {GameStart ? (
        <div className="px-16 w-full flex justify-between text-4xl font-bold text-gray-400 font-poppins tracking-widest">
          <div className="flex flex-col text-blue-400 items-center">
            SCORE
            <p className="text-6xl text-blue-500">{Score}</p>
          </div>
          <div className="flex flex-col text-red-400 items-center">
            Timer
            <p className="text-6xl text-red-500">{Timer}</p>
          </div>
        </div>
      ) : (
        <div className="px-16 w-full flex justify-between text-5xl text-gray-400">
          <Link to="/" className="hover:text-sky-300 transition-all ease-in-out">
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
          <span className="text-rose-400">g</span>
        </div>
        {!GameStart ? (
          <div className={`font-knewave text-${color}-300`}>
            {StartTimer === 0 ? (
              "GO!"
            ) : Start ? (
              <div>{StartTimer}</div>
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
          <div className="text-pink-800 uppercase flex flex-col justify-center items-center font-raleway font-bold">
            <div className="text-center text-6xl w-[35rem] text-white border-4 bg-gradient-to-b from-yellow-400 tracking-widest py-2 rounded-xl border-gray-400 to-orange-400 ">
              {Word}
            </div>
            <input
              type="text"
              className="mt-4 w-[35rem] uppercase text-center rounded-3xl bg-transparent border-4 outline-none py-2 tracking-widest border-orange-500"
              autoFocus
              value={Key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeedTypeGame;
