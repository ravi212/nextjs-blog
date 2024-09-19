
// import PostsPagination from '@/components/atoms/blog/pagination'
import { formatDate } from '@/utils/common'
import dynamic from 'next/dynamic'
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
        <div className='w-full flex justify-center items-center py-10'>
          <p className=''>No posts found</p>
        </div>
        
      }
    </div>
  )
}

export default Posts