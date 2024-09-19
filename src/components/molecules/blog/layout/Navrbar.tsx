import Cottage from "@mui/icons-material/Cottage";
import RecentActors from "@mui/icons-material/RecentActors";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Suspense } from "react";
const SideDrawer = dynamic(
  () => import("@/components/atoms/blog/layout/drawer"),
  { ssr: false }
);

const Navrbar = ({ categories }: { categories: CategoryType[] }) => {

  return (
    <div className="bg-gray-700 shadow-xl px-7 py-6">
      <div className="mx-auto w-full flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="lg:hidden flex">
            <Suspense>
              <SideDrawer categories={categories} />
            </Suspense>
          </div>
          <Link
            href={"/"}
            className="text-center lg:flex hidden text-white text-2xl font-semibold cursor-pointer hover:text-red-400"
          >
            <Cottage className="w-7 h-7" />
          </Link>
          <Link
            href={"/"}
            className="text-center text-white text-2xl font-semibold cursor-pointer hover:text-red-400"
          >
            Ravi R.
          </Link>
        </div>

        <Link
          href={`https://ravi.rainaspace.com`}
          target="_blank"
          className="flex items-center gap-2 hover:text-red-400 text-white"
        >
          <RecentActors className="w-8 h-8" />
          <p className="text-base font-medium md:flex hidden">Portfolio</p>
        </Link>
      </div>
    </div>
  );
};

export default Navrbar;
