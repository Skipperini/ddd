import React from 'react'
import LoginControl from './LoginControl'
export default function Header(){
    
    return (
        <header>
            <div>
                <ul className='nav'>
                <span className='logo'>Kitty Shop</span>
                <li><LoginControl/></li>
                <li>about us</li>
                <li>contacts</li>
                </ul>
            </div>
            <div className='baner'></div>
        </header>
        
    )
}