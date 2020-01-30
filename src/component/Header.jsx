import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = props => {
  return (
    <header>
      <h3 className='header-title'>Grid Flow</h3>
      <nav>
        <NavLink exact to='/'>MAP</NavLink>
        <NavLink exact to='/browse'>BROWSE</NavLink>
      </nav>
    </header>
  )
}

export default Header
