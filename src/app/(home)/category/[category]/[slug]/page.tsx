
import React, { lazy } from 'react'
const Post = lazy(() => import('@/components/molecules/blog/post'))

const Page = ({
    params,
    searchParams,
  }: {
    params: { slug: string, category: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) => {

  return (
    <div>
      <Post slug={params?.slug}/>
    </div>
  )
}

export default Page