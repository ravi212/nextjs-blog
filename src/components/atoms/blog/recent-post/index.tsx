import TypeSpecimen from "@mui/icons-material/TypeSpecimen";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const RecentPost = ({ post, index }: { post: PostType; index: number }) => {
  return (
      <div
        className={`relative  hover:scale-105 transition-all duration-150 ease-in-out  hover:shadow-2xl w-full min-h-64 overflow-hidden rounded-xl shadow-xl col-span-2 md:col-span-1 cursor-pointer`}
      >
    <Link
      href={{ pathname: `/category/${post?.category?.slug}/${post?.slug}` }}
    >
        {/* overlay with opacity */}
        <div className="w-full h-full absolute bg-opacity-50 z-10 inset-0 bg-gradient-to-t from-black "></div>
        <Image
          alt="blog-img"
          fill
          className="absolute inset-0 object-cover"
          src={post?.imageUrl}
          priority={true}
        />

        {/* <div className="flex items-center gap-1  rounded-lg p-2 absolute right-6 bottom-6 z-20">
          <CalendarMonth className="w-4 h-4 text-white" />
          <p className="text-white text-xs">
            {formatDate(new Date(post.updatedAt))}
          </p>
        </div> */}

        {/* title and author */}
        <div className="z-20 flex flex-col  w-4/5 sm:w-3/4 py-5 absolute bottom-0 left-5">
          <div className="text-white py-4 text-xs font-normal items-center ">
            <span className="bg-gray-800 border border-gray-500 p-2 rounded-md">
              <TypeSpecimen className="w-4 h-4 text-white" />{" "}
              <span>{`${post.category.title}`}</span>
            </span>
          </div>

          <h2 className="text-white text-base font-medium ">{post.title}</h2>
          <h2 className="text-white text-sm py-2">
            {post.description.slice(0, 120)}...
          </h2>
          {/* <div className="text-white text-xs font-medium items-center">
            <PortraitIcon className="w-6 h-6 text-white" />{" "}
            <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
          </div> */}
        </div>
        </Link>
      </div>
   
  );
};

export default RecentPost;
