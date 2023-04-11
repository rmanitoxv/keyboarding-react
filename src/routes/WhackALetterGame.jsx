import React, { useEffect, useState, useCallback } from "react";

const WhackALetterGame = () => {
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [letters, setLetters] = useState([]);
  const [timer, setTimer] = useState(100);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const deleteElement = (array, value) => {
    for(let i = 0; i<array.length; i++){
        if(array[i] === value){
            array.splice(i, 1)
            return(array)
        }
    }
  }

  const insertValue = (array, value) => {
    let newArray = array
    newArray.push(value)
    return newArray
  }

  const decrementTimer = useCallback(() => {
    setTimer((oldTimer) => oldTimer - 1);
  }, []);

  const spawnLetter = () => {
    const div = {
        letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        top: Math.floor(Math.random() * (22)),
        left: Math.floor(Math.random() * (46))
    }
    
    setLetters(insertValue(letters, div))

    setTimeout(() => {
        setLetters(deleteElement(letters, div))
      }, 5000);
  }

  useEffect(() => {
    if (timer <= 0) {
      setEnd(true);
      setStart(false);
      return;
    }
    if (start) {
      const timeoutFunction = setInterval(decrementTimer, 1000);
      return () => clearInterval(timeoutFunction);
    }
  }, [decrementTimer, timer, start]);

  useEffect(() => {
    if (start) {
        const timeoutFunction = setInterval(spawnLetter, 1000);
        return () => clearInterval(timeoutFunction);
      }
  }, [start, timer, spawnLetter])


  return (
    <div className="w-full h-screen bg-[#EAECFF] flex flex-col justify-center items-center">
      <div className="bg-white w-[48.5rem] h-[24.5rem] relative">
        {
            letters.map((div, index) => {
                return(
                    <div key={index} className="absolute" style={{top:`${div.top}rem`, left:`${div.left}rem`}}>
                        <div className="rounded-full bg-blue-600 text-white w-10 h-10 flex justify-center items-center">
                            {div.letter}
                        </div>
                    </div>
                )
            })
        }
      </div>
      <div>
        {timer}
      </div>
      <button onClick={()=>setStart(true)} className="py-2 px-4 rounded-3xl mt-4 bg-white ">
        START
      </button>
    </div>
  );
};

export default WhackALetterGame;
