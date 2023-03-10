import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
export default function Loader() {
  return (
    <div className="absolute w-full h-[100vh] top-0 left-0 flex items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  )
}
