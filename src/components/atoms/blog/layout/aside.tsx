"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Aside = ({categories}: {categories: CategoryType[]}) => {

    const searchParams = useSearchParams()
    const category = searchParams.get('category');
    const activeCatId = categories?.find((cat: CategoryType) => cat.slug == category)?._id

  return (
    <aside className=" flex flex-col gap-3 p-3">
        <Link className={`${!activeCatId ? 'text-red-400 text-lg font-medium': ''} text-base hover:text-red-400 hover:text-lg transition-all `} href={`/blog`}>All</Link>
        {
            categories?.map((cat: CategoryType, index: number) => (
            <Link className={`${activeCatId == cat._id ? 'text-red-400 text-lg font-medium': ''} text-base hover:text-red-400 hover:text-lg transition-all `} key={index} href={`/${cat.slug}`}>{cat.title}</Link>
        ))
        }
    </aside>
  )
}

export default Aside