import React from 'react'
import Navbar from './Navbar'

const layout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  )
}

export default layout


