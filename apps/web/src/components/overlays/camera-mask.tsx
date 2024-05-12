import React from 'react'

const CameraMask = () => {
  return (
    <>
      <div className="absolute rounded-tl-2xl top-[-8px] left-[-8px] border-t-2 border-l-2 border-gray-500 h-4 w-4"></div>
      <div className="absolute rounded-tr-2xl top-[-8px] right-[-8px] border-t-2 border-r-2 border-gray-500 h-4 w-4"></div>
      <div className="absolute rounded-bl-2xl bottom-[-8px] left-[-8px] border-b-2 border-l-2 border-gray-500 h-4 w-4"></div>
      <div className="absolute rounded-br-2xl bottom-[-8px] right-[-8px] border-b-2 border-r-2 border-gray-500 h-4 w-4"></div>
    </>
  )
}

export default CameraMask
