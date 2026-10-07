import React from 'react'
import { Link } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/reset">Reset</Link>
      </nav>
    </div>
  )
}
