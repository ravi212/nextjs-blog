import Loading from "@/components/atoms/common/Loading";
import Posts from "@/components/molecules/admin/posts";
import { getAllPosts } from "@/lib/actions/post.action";
import Link from "next/link";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | any };
}) => {

  const queryParams = {
    page: searchParams?.page,
    pageSize: searchParams?.pageSize,
    category: searchParams?.category
  };
  const data = await getAllPosts(false, queryParams?.category, queryParams);

  const posts: any = data?.posts;
  const totalCount: number = data?.totalCount;

  return (
    <div>
      <div className="py-6 flex justify-between items-center">
        <h3 className="text-2xl font-medium">Posts</h3>
        <Link
          href={`/admin/post/add`}
          className="bg-red-500 p-3 rounded-md text-white hover:text-white cursor-pointer"
        >
          Add New
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <Posts initialPosts={posts} totalCount={totalCount}/>
      </Suspense>
    </div>
  );
};

export default Page;
