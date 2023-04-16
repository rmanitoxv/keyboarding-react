import React from 'react'
import balloon from '../assets/balloon.png'
import balloonPop from '../assets/balloon-pop.gif'

const Balloon = (props) => {
    const div = props.div
    return (
        <div
            className={`absolute`}
            style={{ top: `${div.top}rem`, left: `${div.left}rem` }}
        >
            <div className={`playing w-36 text-white h-36 flex justify-center items-center text-3xl top-0 left-0`} style={{ backgroundImage: `url('${div.bg === 'balloon' ? balloon : balloonPop}')`, backgroundPosition: `50% 50%`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                {div.letter}
            </div>
        </div>
    )
}

export default Balloon