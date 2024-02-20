import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
    return (
        <header className='header'>
            <nav className='nav'>
                <ul className='links-wrapper'>
                    <li>
                        <Link className='link' to='/'>Home</Link>
                    </li>
                    <li >
                        <Link className='link' to='/tasks'>Tasks</Link>
                    </li>
                    <li>
                        <Link className='link' to='/about'>About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
