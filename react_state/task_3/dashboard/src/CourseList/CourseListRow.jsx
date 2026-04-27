import React from 'react'

export default function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  return (
    <tr className={isHeader ? 'bg-table-header opacity-66' : 'bg-table-rows opacity-45'}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan="2" className="border border-gray-400">
            {textFirstCell}
          </th>
        ) : (
          <>
            <th className="border border-gray-400">{textFirstCell}</th>
            <th className="border border-gray-400">{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className="border border-gray-400 pl-2">{textFirstCell}</td>
          <td className="border border-gray-400 pl-2">{textSecondCell}</td>
        </>
      )}
    </tr>
  )
}