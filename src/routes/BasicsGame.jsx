import React, { useState, useCallback, useEffect, useRef } from "react";
import { AiFillHome, AiFillSound } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

let colors = ["blue-500", "blue-500", "blue-500", "blue-500", "blue-500"];
let timeoutRunning = false;
const BasicsGame = () => {
  let { id } = useParams()
  const parameters = [
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [' ', '`', ',', '.', '/', ';', "'", '\\', '[', ']', '-', '='],
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '<', '>', '?', ':', '"', '|', '{', '}'],
  ];

  const fingerKeys = [
    ['a', '`', '~', 1, '!', 'z', 'q'],
    ['s', 2, '@', 'w', 'x'],
    ['d', 3, '#', 'e', 'c'],
    ['f', 4, '$', 5, '%', 'r', 't', 'f', 'g', 'v', 'b'],
    [' '], [' '],
    [6, '^', 7, '&', 'y', 'u', 'h', 'j', 'n', 'm'],
    [8, '*', 'i', 'k', ',', '<'],
    [9, '(', 'o', 'l', '.', '>'],
    [0, ')', 'p', ';', ':', '/', '?', '-', '_', '[', '{', "'", '"', '=', '+', ']', '}', '\\', '|']
  ]

  const getRandomKeys = () => {
    let arrKeys = [];
    let x = 0
    for (let i = 0; i < 5; i++) {
      id == 7 ? x = Math.floor(Math.random() * 6) : x = id - 1 
      arrKeys.push(parameters[x][Math.floor(Math.random() * parameters[x].length)]);
    }
    return arrKeys; 
  };
  
  const [keys, setKeys] = useState(getRandomKeys());
  const [index, setIndex] = useState(0);
  const [random, setRandom] = useState(0);
  const [progress, setProgress] = useState(0);
  const [end, setEnd] = useState(false);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const divRef = useRef(null)

  const reloadComponent = useCallback(() => {
    setRandom((oldRandom) => oldRandom + 1);
  }, []);

  useEffect(() => {
    if (index === 5) {
      setIndex(0);
      setKeys(getRandomKeys());
      colors = ["blue-500", "blue-500", "blue-500", "blue-500", "blue-500"];
    }
  }, [index]);

  useEffect(() => {
    divRef.current.focus();
  }, [index]);

  useEffect(() => {
    if (progress === 100) {
      setEnd(true);
    }
  }, [progress]);

  const changeColor = (key) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (timeoutRunning || end) {
      return;
    }
    if(((/^[A-Za-z0-9\s]$/.test(key)) || (specialChars.test(key))) ){
      if (key.toLowerCase() == keys[index]) {
        colors[index] = "green-500";
        setProgress(progress + 4);
        setIndex(index + 1);
      } else if (key !== "Shift") {
        timeoutRunning = true;
        colors[index] = "red-500";
        reloadComponent();
        setTimeout(() => {
          colors[index] = "blue-500";
          timeoutRunning = false;
          reloadComponent();
        }, 100);
      }
    }
  };
  const restartGame = () => {
    setEnd(false);
    setProgress(0)
    setKeys(getRandomKeys())
    setIndex(0)
    colors = ["blue-500", "blue-500", "blue-500", "blue-500", "blue-500"];
  };

  useEffect(() => {
    setLeft(0)
    setRight(0)
    for(let i = 0; i < 10; i++){
      if (fingerKeys[i].includes(keys[index])){
        if (i<=4){
          setLeft(i+1)
        }
        if (i>=4){
          setRight(i+1)
        }
      }
    }
  }, [index, left, right, end])
  

  return (
    <div
      ref={divRef}
      tabIndex="0"
      className="h-screen py-16 w-screen flex flex-col items-center justify-center text-5xl bg-[#EAECFF]"
      onKeyDown={(e) => changeColor(e.key)}
    >
      {end ? (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-50 transition-all opacity-100 fixed flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto">
          <div className="px-20 py-10 rounded-3xl bg-[#EAECFF] flex flex-col justify-center items-center text-md text-[#2E2E2E] font-poppins">
            <p className="font-rampartone text-7xl mb-4">Congrats!</p>
            <p className="text-2xl my-4">
              You finished the sequences.
            </p>
            <div className="w-full flex justify-between mt-8">
              <button
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white text-2xl"
                onClick={() => restartGame()}
              >
                TRY AGAIN
              </button>
              <Link
                to="/"
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white text-2xl"
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
            <p className="text-2xl my-4">
              You finished the sequences.
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
      <div className="px-16 w-full flex justify-between text-5xl text-gray-400">
          <Link
            to="/"
            className="hover:text-sky-300 transition-all ease-in-out"
          >
            <AiFillHome />
          </Link>
          <AiFillSound />
        </div>
        <div className="font-knewave mb-12">
          <span className="text-blue-400">T</span>
          <span className="text-pink-400">y</span>
          <span className="text-teal-400">p</span>
          <span className="text-sky-400">e</span>
          &nbsp;
          <span className="text-lime-400">t</span>
          <span className="text-orange-400">h</span>
          <span className="text-red-400">e</span>
          &nbsp;
          <span className="text-green-400">S</span>
          <span className="text-purple-400">e</span>
          <span className="text-indigo-400">q</span>
          <span className="text-yellow-400">u</span>
          <span className="text-rose-400">e</span>
          <span className="text-cyan-400">n</span>
          <span className="text-amber-400">c</span>
          <span className="text-fuchsia-400">e</span>
        </div>
      <h1></h1>
      <div className="flex w-full justify-center items-center mb-8 font-raleway font-bold text-white">
        {
          keys.map((key, index) => {
            console.log(key)
            return (
              <div
                key={index}
                className={`flex justify-center items-center border-4 border-gray-500 mx-8 rounded-xl w-24 h-24 bg-${colors[index]}`}
              >
                {key}
              </div>
            );
          }
        )}
      </div>
      { !end &&
        <div className="w-full flex justify-center z-0">
          <div className="relative w-4/5 border-2 h-10">
            <div
              className={`absolute h-full bg-green-600`}
              style={{ width: `${progress}%` }}
            >
              <p className="bg-green-500"></p>
              <p className="bg-red-500"></p>
              <p className="bg-blue-500"></p>
            </div>
          </div>
        </div>
      }
        <div className="flex justify-center w-full">
          <img src={`/images/fingers/${left ? left : "0"}.png`} className="w-96" />
          <img src={`/images/fingers/${right ? right : "00"}.png`} className="w-96" />
        </div>
    </div>
  );
}

export default BasicsGame;
