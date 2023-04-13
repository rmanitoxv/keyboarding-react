import React, { useCallback, useEffect, useRef, useState } from "react";
import random from "random-words";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillSound } from "react-icons/ai";

const SpeedTypeParagraphGame = () => {
  const [text, setText] = useState("");
  const [pg, setParagraph] = useState(random({ exactly: 500, maxLength: 6 }));
  const [pgIndex, setPgIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [tempo, setTempo] = useState(60);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [corrects, setCorrects] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const textAreaRef = useRef(null);
  const refs = useRef(pg.map(() => React.createRef()));
  const [correct, setCorrect ] = useState([])
  const [wrong, setWrong ] = useState([])
  const [c, setC ] = useState([])
  const [w, setW ] = useState([])
  let { id } = useParams();
  let mode
  if (id === "easy") {
    mode = 60
  }
  if (id === "medium") {
    mode = 30
  }
  if (id === "hard") {
    mode = 15
  }
  const [time, setTime] = useState(mode * 1000);

  
  const restart = () => {
    setCorrect([])
    setWrong([])
    setC([])
    setW([])
    setText("");
    setParagraph(random({ exactly: 500, maxLength: 6 }));
    setPgIndex(0);
    setWordIndex(0);
    setCorrects(0);
    setTime(mode * 1000);
    setTempo(60);
    setEnd(false);
    setTimer(null);
    setStart(false);
    refs.current[0].current.scrollIntoView();
  };

  const startCountdown = () => {
    let now = new Date().getTime();
    if (timer) {
      setTime(timer - now);
    }
  };

  const insertValue = (array, value) => {
    let newArray = array
    newArray.push(value)
    return newArray
  }

  const popValue = (array) => {
    let newArray = array
    newArray.pop()
    return newArray
  }

  useEffect(() => {
    if (tempo !== Math.trunc(time / 1000) && Math.trunc(time / 1000) !== 59) {
      setTempo(Math.trunc(time / 1000));
      let index = corrects;
      let current = mode - time / 1000;
      setWpm(index / current);
    }
  }, [time, pgIndex]);

  useEffect(() => {
    if (Math.trunc(time / 1000) <= 0) {
      setEnd(true);
      setStart(false);
      setTimer(null);
      setAccuracy(Math.round((corrects / pgIndex) * 100))
      return;
    }
    if (start) {
      if (timer === null) {
        setTimer(new Date().getTime() + mode * 1000);
      }
      const timeoutFunction = setInterval(startCountdown, 1);
      return () => clearInterval(timeoutFunction);
    }
  }, [timer, start, time, end, text]);


  const checkWord = (word) => {
    setText(word);
  };

  const checkIndex = (i) => {
    if (end) {
      return;
    }
    if (text === " ") {
      setText("");
    }
    if (i === " ") {
      if (text === " " || text === "") {
        setText("");
        return;
      } else if (text === pg[pgIndex]) {
        setCorrects(corrects + 1);
        setCorrect(insertValue(correct, pgIndex))
      } else {
        setWrong(insertValue(wrong, pgIndex))
      }
      setC([])
      setW([])
      setPgIndex(pgIndex + 1);
      setText("");
      setWordIndex(0);
      refs.current[pgIndex + 1].current.scrollIntoView();
    } else if (i === "Backspace") {
      if (wordIndex !== 0) {
        if (c.includes(wordIndex - 1)) {
          setC(popValue(c))
        } else {
          setW(popValue(w))
        }
        setWordIndex(wordIndex - 1);
      }
    } else if (/^[a-zA-Z]$/.test(i)) {
      if (!start) {
        setStart(true);
      }
      if (i === pg[pgIndex].charAt(wordIndex)) {
        setC(insertValue(c, wordIndex))
      } else {
        setW(insertValue(w, wordIndex))
      }
      setWordIndex(wordIndex + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-game-3-bg bg-cover py-16">
      {end ? (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-50 transition-all opacity-100 fixed flex items-center justify-center outline-none overflow-x-hidden overflow-y-auto z-20">
          <div className="px-20 py-10 rounded-3xl bg-[#EAECFF] flex flex-col justify-center items-center text-md text-[#2E2E2E] font-poppins">
            <p className="font-rampartone text-7xl mb-4">Congrats!</p>
            <p>
              Your word per minute is:{" "}
              <span className="text-black">
                {!wpm ? 0 : Math.round(wpm * 60)}
              </span>
            </p>
            <p>
              Your accuracy is:{" "}
              <span className="text-black">{accuracy}%</span>
            </p>
            <div className="w-full flex justify-between mt-8">
              <button
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
                onClick={() => restart()}
              >
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
            <p>
              Your word per minute is:{" "}
              <span className="text-black">
                {!wpm ? 0 : Math.round(wpm * 60)}
              </span>
            </p>
            <p>
              Your accuracy is:{" "}
              <span className="text-black">{Math.round((corrects / pgIndex) * 100)}%</span>
            </p>
            <div className="w-full flex justify-between mt-8">
              <button
                className="rounded-2xl px-4 py-2 bg-purple-400 text-white"
                onClick={() => restart()}
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
      {start ? (
        <div className="px-16 w-full flex justify-between text-4xl font-bold text-gray-400 font-poppins tracking-widest">
          <div className="flex flex-col text-blue-400 items-center">
            WPM
            <p className="text-6xl text-blue-500">
              {!wpm ? 0 : Math.round(wpm * 60)}
            </p>
          </div>
          <div className="flex flex-col text-red-400 items-center">
            Timer
            <p className="text-6xl text-red-500">{Math.trunc(time / 1000)}</p>
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
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="font-knewave mb-12 text-6xl">
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
        <div className="w-1/2 text-3xl">
          <div className="border-2 h-28 p-4 bg-gradient-to-b from-yellow-400 border-orange-900 to-orange-400 rounded-xl ">
            <div className="relative h-full w-full">
              <div
                className={`absolute overflow-hidden w-full h-full leading-5 select-none  flex justify-between flex-wrap`}
              >
                {pg.map((sentence, index) => {
                  let i = index;
                  return (
                    <div
                      className={`py-2 text-${
                        correct.includes(index)
                          ? "green-600"
                          : wrong.includes(index)
                          ? "red-600"
                          : "white"
                      }`}
                      key={index}
                      ref={refs.current[index]}
                    >
                      {sentence.split("").map((letter, key) => {
                        return (
                          <span
                            key={key}
                            className={`bg-${
                              key === wordIndex && i === pgIndex
                                ? "gray-600"
                                : "none"
                            } text-${
                              c.includes(key) && i === pgIndex
                                ? "green-600"
                                : w.includes(key) && i === pgIndex
                                ? "red-600"
                                : "inherit"
                            }`}
                          >
                            {letter}
                          </span>
                        );
                      })}
                      <span
                        style={{
                          background:
                            sentence.split("").length === wordIndex &&
                            i === pgIndex
                              ? "gray"
                              : "none",
                        }}
                      >
                        &nbsp;
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <input
            disabled={end ? true : false}
            type="text"
            className="bg-transparent border-orange-500 outline-none w-full overflow-hidden resize-none text-pink-800 text-center text-6xl rounded-3xl mt-4 border-4"
            value={text}
            onChange={(e) => checkWord(e.target.value)}
            onKeyDown={(e) => checkIndex(e.key)}
            ref={textAreaRef}
            autoFocus
          ></input>
          <p className="text-red-600 bg-gray-600"></p>
          <p className="text-green-600"></p>
        </div>
      </div>
    </div>
  );
}

export default SpeedTypeParagraphGame;
