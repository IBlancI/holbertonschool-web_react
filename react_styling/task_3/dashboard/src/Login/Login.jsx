import React from 'react'
import WithLogging from '../HOC/WithLogging'

function Login() {
  return (
    <div className="border-t-2 border-[var(--main-color)] px-4 py-3">
      <p className="mb-4 text-sm">Login to access the full dashboard</p>

      <div className="flex items-center gap-1 text-xs">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="h-5 w-24 border border-gray-500 px-1"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="h-5 w-24 border border-gray-500 px-1"
        />

        <button type="button" className="h-5 border border-gray-500 px-1 text-xs">
          OK
        </button>
      </div>
    </div>
  )
}

export default WithLogging(Login)