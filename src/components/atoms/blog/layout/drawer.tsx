"use client";
import React, { useState } from "react";
import { Drawer } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useParams } from "next/navigation";
import ListIcon from "@mui/icons-material/List";
import CottageIcon from "@mui/icons-material/Cottage";

const SideDrawer = ({ categories }: { categories: CategoryType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const category = params.category;
  const activeCatId = categories?.find(
    (cat: CategoryType) => cat.slug == category,
  )?._id;

  return (
    <div className="w-full">
      <ListIcon
        onClick={() => setIsOpen(!isOpen)}
        className="text-white w-6 h-6 cursor-pointer"
      />
      <Drawer
        placement="left"
        width={270}
        open={isOpen}
        closeIcon={false}
        mask={false}
        style={{ backgroundColor: "#fff", padding: 0, margin: 0 }}
        bodyStyle={{
          padding: 0,
          margin: 0,
        }}
      >
        <div className="py-4 flex flex-col gap-1">
          <div className="flex items-center justify-between px-2 pb-2">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:bg-gray-100"
            >
              <CottageIcon className="w-5 h-5 text-gray-700 group-hover:text-red-400 transition-colors" />
              {/* <span className="text-lg font-semibold text-gray-700 group-hover:text-red-400 transition-colors">
      Home
    </span> */}
            </Link>

            {/* Close */}
            <div className="px-2">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full transition-all hover:bg-gray-100 active:scale-95 "
                aria-label="Close menu"
              >
                <CloseIcon className="text-gray-700 w-5 h-5 cursor-pointer group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
          <hr />

          <Link
            href="/category/all"
            onClick={() => setIsOpen(false)}
            className={`group relative flex items-center rounded-lg px-3 py-2 transition-all duration-200
      ${
        !activeCatId
          ? "bg-red-50 text-red-500 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
          >
            {!activeCatId && (
              <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-red-400" />
            )}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              All
            </span>
          </Link>

          {categories?.map((cat: CategoryType) => {
            const isActive = activeCatId === cat._id;

            return (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center rounded-lg px-3 py-2 transition-all duration-200
          ${
            isActive
              ? "bg-red-50 text-red-500 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-red-400" />
                )}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
