
// import PostsPagination from '@/components/atoms/blog/pagination'
import Empty from '@/components/atoms/common/Empty'
import { formatDate } from '@/utils/common'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { lazy } from 'react'
const BlogPost = lazy(() => import('@/components/atoms/blog/post'))
const PostsPagination = dynamic(() => import('@/components/atoms/blog/pagination'), {ssr: false})

const Posts = ({posts, totalCount}: {posts: PostType[], totalCount: number}) => {

  return (
    <div className='flex flex-col gap-6 w-full'>
      {
        posts && posts.length > 0 ?
        <>
        {posts.map(post => (
        <BlogPost
          key={post._id}
          title={post.title}
          textContent={post.textContent}
          date={formatDate(new Date(post.updatedAt))}
          slug={post?.slug}
          imageUrl={post?.imageUrl}
          pinned={post?.pinned}
          featured={post?.featured}
          hashTags={post?.tags}
          author={`${post.author.firstName} ${post.author.lastName}`}
          category={post?.category}
          description={post?.description}
        />
        ))
      }

        <div className='py-8 w-full flex justify-center'>
          <PostsPagination totalCount={totalCount} />
        </div>
        </>

        :
        <div className='w-full flex flex-col justify-center items-center py-10'>
          <Empty />
          <h3 className='text-gray-800 text-center text-2xl font-medium'>
            <p>The list is empty</p>
            <p className='text-xl py-4'> You can always explore other posts</p>
            <Link className='text-blue-500 font-normal underline text-base' href={`/category/all`}>click here</Link>
          </h3>
        </div>
        
      }
    </div>
  )
}

export default Posts