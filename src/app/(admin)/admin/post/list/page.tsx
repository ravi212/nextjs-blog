import Posts from '@/components/molecules/admin/posts'
import { getAllPosts } from '@/lib/actions/post.action'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = async () => {
    const result: any = await getAllPosts();
    let posts!: PostType;
    if (result?.success) {
      posts = result?.posts;
    }

  return (
    <div>
      <div className='py-6 flex justify-between items-center'>
        <h3 className="text-2xl font-medium">Posts</h3>
        <Link href={`/admin/post/add`} className='bg-red-500 p-3 rounded-md text-white hover:text-white cursor-pointer'>
            Add New
        </Link>
      </div>
      <Posts initialPosts={posts} />
    </div>
  )
}

export default Page