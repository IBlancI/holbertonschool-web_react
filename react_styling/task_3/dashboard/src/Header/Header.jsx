import React from 'react'
import logo from '../assets/holberton-logo.jpg'

export default function Header() {
  return (
    <div className="flex items-center gap-6 px-4 pt-2 pb-6">
      <img src={logo} alt="holberton logo" className="w-28 h-auto" />
      <h1 className="text-4xl font-bold text-[var(--main-color)]">
        School Dashboard
      </h1>
    </div>
  )
}