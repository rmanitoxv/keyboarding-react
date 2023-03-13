import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export class Root extends PureComponent {
  render() {
    return (
    <div className='h-screen'>
      <div className='flex flex-col h-full justify-center items-center text-[6rem] text-center'>
        <p className='pb-12'>
            Welcome to<br/>TECHNO TYPER 
        </p>
        <Link to={`#`}>START</Link> 
      </div>
    </div>
    )
  }
}

export default Root