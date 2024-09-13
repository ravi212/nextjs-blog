"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const Aside = ({categories}: {categories: CategoryType[]}) => {

    const params = useParams()
    const category = params.category;
    const activeCatId = categories?.find((cat: CategoryType) => cat.slug == category)?._id

  return (
    <aside className=" flex flex-col gap-3 p-3">
        <Link className={`${!activeCatId ? 'text-red-400 text-lg font-medium': ''} text-base hover:text-red-400 hover:text-lg transition-all `} href={`/`}>All</Link>
        {
            categories?.map((cat: CategoryType, index: number) => (
            <Link className={`${activeCatId == cat._id ? 'text-red-400 text-lg font-medium': ''} text-base hover:text-red-400 hover:text-lg transition-all `} key={index} href={`/category/${cat.slug}`}>{cat.title}</Link>
        ))
        }
    </aside>
  )
}

export default Aside