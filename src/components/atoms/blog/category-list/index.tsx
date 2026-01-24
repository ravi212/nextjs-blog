import Link from "next/link";
import React from "react";

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <ul className="py-8 w-auto flex flex-wrap gap-4 px-4">
      <li className="bg-gray-700 text-white py-2 px-3 rounded-lg transition-all duration-150 ease-in-out  hover:scale-105 shadow-xl hover:shadow-2xl">
        <Link href={`/category/all`}>All Posts</Link>
      </li>
      {categories &&
        categories.map((cat: CategoryType, index: number) => (
          <li
            key={index}
            className="bg-gray-700 text-white py-2 px-3 rounded-lg hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Link href={`/category/${cat.slug}`}>{cat.title}</Link>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
