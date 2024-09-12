
import { formatDate } from '@/utils/common'
import React, { lazy } from 'react'
const BlogPost = lazy(() => import('@/components/atoms/blog/post'))

const Posts = ({posts}: {posts: PostType[]}) => {

  return (
    <div>
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
        />
      ))}
    </div>
  )
}

export default Posts