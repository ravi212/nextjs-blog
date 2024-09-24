import Image from 'next/image'
import React from 'react'
import EmptyList from '../../../../public/empty.png'

const Empty = () => {
  return (
    <div>
        <Image src={EmptyList} priority alt='empty' />
    </div>
  )
}

export default Empty