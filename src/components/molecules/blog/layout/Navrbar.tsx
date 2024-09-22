import Cottage from "@mui/icons-material/Cottage";
import RecentActors from "@mui/icons-material/RecentActors";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import Logo from "../../../../../public/icons/logo-circle.avif";

const SideDrawer = dynamic(
  () => import("@/components/atoms/blog/layout/drawer"),
  { ssr: false }
);

const Navrbar = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <div className="bg-gray-700 shadow-xl px-7 py-5">
      <div className="relative mx-auto w-full xl:w-11/12 flex justify-between items-center">
        <div className="flex gap-2 items-center hover:text-red-400 cursor-pointer">
          <div className="lg:hidden flex">
            <Suspense>
              <SideDrawer categories={categories} />
            </Suspense>
          </div>
          <Link
            href={"/"}
            className="lg:flex items-center hidden gap-2 hover:text-red-400 text-white"
          >
            <Cottage className="w-6 h-6" />
            <p className="text-base font-medium md:flex hidden">Home</p>
          </Link>
          {/* <Link
            href={"/"}
            className="text-center text-white text-2xl font-semibold cursor-pointer hover:text-red-400"
          >
            Ravi R.
          </Link> */}
        </div>

        <Image
          src={Logo}
          priority
          width={0}
          height={0}
          className="absolute m-auto top-0 right-0 bottom-0 left-0 w-10 h-10"
          alt="logo"
        />

        <Link
          href={`https://ravi.rainaspace.com`}
          target="_blank"
          className="flex items-center gap-2 hover:text-red-400 text-white"
        >
          <RecentActors className="w-7 h-7" />
          <p className="text-base font-medium lg:flex hidden">Portfolio</p>
        </Link>
      </div>
    </div>
  );
};

export default Navrbar;
