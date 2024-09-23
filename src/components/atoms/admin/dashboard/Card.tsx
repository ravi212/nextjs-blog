"use client"
import React from 'react'

const Card = ({title, count}: {title: string, count: number}) => {
  return (
    <div className='bg-white md:w-1/3 w-full p-6 flex justify-between text-gray-800 shadow-lg rounded-xl text-lg font-medium'>
        <span className='px-2 py-3'>{title}</span>
        <span className='px-2 py-3'>{count}</span>
    </div>
  )
}

export default Card