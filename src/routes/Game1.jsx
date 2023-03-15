import React, { useEffect, useState } from "react";

function Game1() {
  const [key, setkey] = useState('');
    let keys = [
        {letter: "a", color: "red"},
        {letter: "b", color: "blue"},
        {letter: "c", color: "green"},
        {letter: "d", color: "violet"},
        {letter: "e", color: "pink"},
    ]
  useEffect(() => {
    console.log(key)
    let el = document.getElementById(key)
    if(el){
        keys.forEach((e)=>{
            if(e.letter==key){
                console.log(e.color)
                el.style.color = e.color
            }
        })
    }
    console.log(el)
  }, [key]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center" tabIndex={0} onKeyDown={e => setkey(e.key)}>
      <p id="a">A</p>
      <p id="b">B</p>
      <p id="c">C</p>
      <p id="d">D</p>
      <p id="e">E</p>
    </div>
  );
}

export default Game1;
