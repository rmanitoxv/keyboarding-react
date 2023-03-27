import React, { useCallback, useEffect, useRef, useState } from "react";
import random from "random-words";

let correct = [];
let wrong = [];
let timeoutRunning = false;
function SpeedTypeParagraphGame() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("gray-600");
  const [pg, setParagraph] = useState(random(200));
  const [pgIndex, setPgIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [timer, setTimer] = useState(60);

  const textAreaRef = useRef(null);
  const paragraphRef = useRef(null);
  const refs = useRef(pg.map(() => React.createRef()));

  const checkWord = (word) => {
    setText(word);
  };

  const checkIndex = (i) => {
    if (text === " ") {
      setText("");
    }
    if (i === " ") {
      if (text === pg[pgIndex]) {
        correct.push(pgIndex);
      } else {
        wrong.push(pgIndex);
      }
      setPgIndex(pgIndex + 1);
      setText("");
      setWordIndex(0);
    } else if (i === "Backspace") {
      if (wordIndex !== 0) {
        setWordIndex(wordIndex - 1);
      }
    } else if (/^[a-zA-Z]$/.test(i)) {
      setWordIndex(wordIndex + 1);
    }
    paragraphRef.current[pgIndex].current.scrollIntoView()
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="border-2 w-1/2 h-48 relative text-3xl">
        <div className="relative w-full h-full">
          <div
            className={`absolute overflow-hidden w-full h-full select-none text-${color} flex flex-wrap mb-8 z-10 bg-transparent`}
          >
            {pg.map((sentence, index) => {
              let i = index;
              return (
                <div
                  key={index}
                  ref={refs.current[index]}
                  style={{
                    color: correct.includes(index)
                      ? "green"
                      : wrong.includes(index)
                      ? "red"
                      : "black",
                  }}
                >
                  {sentence.split("").map((letter, key) => {
                    return (
                      <span
                        key={key}
                        style={{
                          background:
                            key === wordIndex && i === pgIndex
                              ? "gray"
                              : "none",
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                  <span style={{
                          background:
                            sentence.split("").length === wordIndex && i === pgIndex
                              ? "gray"
                              : "none",
                        }}>&nbsp;</span>
                </div>
              );
            })}
          </div>
        </div>
        <input
          type="text"
          className="bg-transparent z-10 select-all overflow-hidden resize-none text-black"
          value={text}
          onChange={(e) => checkWord(e.target.value)}
          onKeyDown={(e) => checkIndex(e.key)}
          ref={textAreaRef}
          autoFocus
        ></input>
        <p className="text-red-600"></p>
      </div>
    </div>
  );
}

export default SpeedTypeParagraphGame;
