"use client";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

const Navbar = ({
  children,

}: {
  children: React.ReactNode,

}) => {
  return (
    <div className="bg-white shadow-xl p-6 flex items-center justify-between">
      <div className="flex items-center gap-6 justify-center">
        {children}
        <p className="text-2xl font-medium text-gray-800">Ravi R.</p>
      </div>
      <div onClick={() => signOut()} className="flex gap-3">
        <LogoutIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
