import React from 'react'
import PropTypes from 'prop-types'

function BodySection({ title, children = null }) {
  return (
    <div className="px-4 py-4">
      <h2 className="mb-2 text-base font-bold">{title}</h2>
      {children}
    </div>
  )
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default BodySection