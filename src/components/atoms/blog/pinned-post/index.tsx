import React from 'react'
import { formatDate } from '@/utils/common';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import TypeSpecimen from '@mui/icons-material/TypeSpecimen';
import PortraitIcon from "@mui/icons-material/Portrait";
import Image from 'next/image';
import Link from 'next/link';

const PinnedPost = ({post}: {post: PostType}) => {

  return (
    <Link href={{ pathname: `/category/${post?.category?.slug}/${post?.slug}`}}>
    <div  className="relative w-[100%] min-h-[500px] overflow-hidden rounded-xl ">
    {/* overlay with opacity */}
    <div className="w-full h-full absolute bg-opacity-90 z-10 inset-0 bg-gradient-to-t from-black "></div>
    <Image
      alt="blog-img"
      fill
      className="absolute inset-0 object-cover"
      src={post?.imageUrl}
      priority={true}
    />
    
    <div className="flex items-center gap-1  rounded-lg p-2 absolute right-6 bottom-6 z-20">
      <CalendarMonth className="w-5 h-5 text-white" />
        <p className="text-white text-sm">
          {formatDate(new Date(post.updatedAt))}
        </p>
    </div>

  {/* title and author */}
  <div className="z-20 flex flex-col  w-3/4 md:w-2/3 py-7 absolute bottom-0 left-6">
      <div className="text-white py-6 text-xs font-medium items-center ">
        <span className="bg-gray-800 border border-gray-500 p-3  rounded-full">
          <TypeSpecimen className="w-5 h-5 text-white" />{" "}
          <span>{`${post.category.title}`}</span>
        </span>

      </div>

    <h2 className="text-white md:text-4xl text-3xl font-medium ">{post.title}</h2>
    <h2 className="text-white text-base py-4">{post.description}</h2>
    <div className="text-white text-sm font-medium items-center">
        <PortraitIcon className="w-6 h-6 text-white" />{" "}
        <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
      </div>
  </div>
  </div>
  </Link>
  )
}

export default PinnedPost