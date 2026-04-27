import React from 'react'
import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

export default function Footer({ isIndex = true }) {
  return (
    <div className="mt-8 border-t-2 border-[var(--main-color)] py-3 text-center text-sm italic">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(isIndex)}
      </p>
    </div>
  )
}