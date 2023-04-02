import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

let colors = ["white", "white", "white", "white", "white"];
let timeoutRunning = false;
const BasicsGame = () => {
  let { id } = useParams()
  const parameters = [
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [' ', '`', ',', '.', '/', ';', "'", '\\', '[', ']', '-', '='],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '<', '>', '?', ':', '"', '|', '{', '}'],
  ];
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

  const divRef = useRef(null)

  const reloadComponent = useCallback(() => {
    setRandom((oldRandom) => oldRandom + 1);
  }, []);

  useEffect(() => {
    if (index === 5) {
      setIndex(0);
      setKeys(getRandomKeys());
      colors = ["white", "white", "white", "white", "white"];
    }
  }, [index]);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setEnd(true);
    }
  }, [progress]);

  const changeColor = (key) => {
    if (timeoutRunning || end) {
      return;
    }
    console.log(key)
    if (key == keys[index]) {
      colors[index] = "green-500";
      setProgress(progress + 4);
      setIndex(index + 1);
    } else if (key !== "Shift") {
      timeoutRunning = true;
      colors[index] = "red-500";
      reloadComponent();
      setTimeout(() => {
        colors[index] = "white-500";
        timeoutRunning = false;
        reloadComponent();
      }, 100);
    }
  };

  return (
    <div
      ref={divRef}
      tabIndex="0"
      className="w-screen h-screen flex flex-col justify-center items-center text-6xl"
      onKeyDown={(e) => changeColor(e.key)}
    >
      <h1 className="mb-12">Type the sequence</h1>
      <h1></h1>
      <div className="flex w-full justify-center items-center mb-8">
        {end ? (
          <>Congratulations!</>
        ) : (
          keys.map((key, index) => {
            return (
              <div
                key={index}
                className={`flex justify-center items-center border-4 mx-8 rounded-xl w-32 h-32 bg-${colors[index]}`}
              >
                {key == ' ' ? <>&nbsp;</> : key}
              </div>
            );
          })
        )}
      </div>
      {!end && (
        <div className="relative w-4/5 border-2 h-8">
          <div
            className={`absolute h-full bg-green-600`}
            style={{ width: `${progress}%` }}
          >
            <p className="bg-green-500"></p>
            <p className="bg-red-500"></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasicsGame;
