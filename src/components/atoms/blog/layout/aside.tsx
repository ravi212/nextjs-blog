"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Aside = ({ categories }: { categories: CategoryType[] }) => {
  const params = useParams();
  const category = params.category;
  const activeCatId = categories?.find(
    (cat: CategoryType) => cat.slug == category,
  )?._id;

  return (
    <div className="w-[30%] lg:flex hidden">
      <aside className="sticky flex flex-col gap-1 px-2 h-fit top-5">
        <div className="flex flex-col gap-1 w-full">
          {/* All */}
          <Link
            href="/category/all"
            className={`group relative flex items-center px-3 py-2 transition-all duration-200
      ${
        !activeCatId
          ? "bg-red-50 text-red-500 font-medium"
          : "text-gray-700 hover:bg-gray-100"
      }`}
          >
            {!activeCatId && (
              <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-red-400" />
            )}
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
              All
            </span>
          </Link>

          {/* Categories */}
          {categories?.map((cat: CategoryType) => {
            const isActive = activeCatId === cat._id;

            return (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className={`group relative flex items-center  px-3 py-2 transition-all duration-200
          ${
            isActive
              ? "bg-red-50 text-red-500 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-red-400" />
                )}
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Aside;
