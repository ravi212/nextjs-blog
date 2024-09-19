import Link from 'next/link'
import React from 'react'

const CategoryList = ({categories}: {categories: CategoryType[]}) => {
  return (
    <ul className="py-8 flex flex-wrap gap-4 px-4 items-center">
    <li >
     <Link href={`/category/all`} className="bg-gray-700 text-white py-2 px-3 rounded-lg">
          All Posts
     </Link>
    </li>
     {
          categories && categories.map((cat: CategoryType, index: number) => (
              <li key={index}>
                         <Link href={`/category/${cat.slug}`} className="bg-gray-700 text-white py-2 px-3 rounded-lg">
                         {cat.title}
                  </Link>
                  
              </li>
          ))
      }
      </ul>
  )
}

export default CategoryList