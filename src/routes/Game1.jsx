import React, { useCallback, useEffect, useState } from "react";
import random from "random-words"

function Game1() {
  const [Key, setKey] = useState('');
  const [Word, setWord] = useState(random());
  const [Timer, setTimer] = useState(60)
  const [Score, setScore] = useState(0)
  const [End, setEnd] = useState(false)

  const decrementTimer =  useCallback(() => {
    setTimer((oldTimer) => oldTimer-1)
  },[])

  useEffect(() => {
    if(Timer <= 0){
      setEnd(true)
      return
    }
    const timeoutFunction = setInterval(decrementTimer, 1000)
    return () => clearInterval(timeoutFunction);
  },[decrementTimer, Timer])

  useEffect(() => {
    if (Key == Word){
      setKey('')
      setWord(random({minLength: 6}))
      setTimer(Timer + 3 >= 60 ? 60 : Timer + 3)
      setScore(Score + 1)
    }
  }, [Key]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Difficulty: Easy</h1>
      <div>
        <h2>Speed Typer</h2>
          <small>Type the following:</small>
    
          <h1> {Word} </h1>
        <input type="text" autoFocus value={Key} onChange={(e) => setKey(e.target.value)} />

        <p className="time-container">Time left: {Timer}</p>
  
        <p className="score-container">Score: {Score}</p>
  
        <div>{
          End === true &&
            <>
              <h1>Time ran out</h1>
              <p>Your final score is {Score}</p>
              <button onclick="location.reload()">Reload</button>
              <button onclick="location.href='index.html'">Go Back</button>  
            
            </>
        }</div>
      </div>
    </div>
  );
}

export default Game1;
