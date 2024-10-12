import Aside from "@/components/atoms/blog/layout/aside";
import Empty from "@/components/atoms/common/Empty";
import Posts from "@/components/molecules/blog/posts";
import { siteMetaData } from "@/constants/siteMetaData";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllPosts } from "@/lib/actions/post.action";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  return {
    title: `${
      params.category.charAt(0).toUpperCase() + params.category.slice(1)
    }`,
    openGraph: {
      title: siteMetaData.title,
      description: siteMetaData.description,
      url: siteMetaData.siteUrl + `/${params.category}`,
    },
  };
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined | any };
}) => {
  const category = params?.category;
  const queryParams = {
    page: searchParams?.page,
    pageSize: searchParams?.pageSize,
  };

  const data = await getAllPosts(false, category, queryParams);

  const posts: any = data?.posts;
  const totalCount: number = data?.totalCount;

  const res: any = await getAllCategories();
  const categories = res?.categories;

  revalidatePath(`/(home)/category/[category]`, "page");

  if (!posts || posts?.length == 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-10">
        <Empty />
        <h3 className="text-gray-800 text-center text-2xl font-medium">
          <p>Sorry! The list is empty</p>
          <p className="text-xl py-4"> You can always explore other posts</p>
          <Link
            className="text-blue-500 font-normal underline text-base"
            href={`/category/all`}
          >
            View All Posts
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 w-full mx-auto md:w-[100%] min-h-screen">
      <div className="w-[100%] mx-auto mb-4">
        <Posts posts={posts} totalCount={totalCount} />
      </div>
      <Suspense>
        <Aside categories={categories} />
      </Suspense>
    </div>
  );
};

export default Page;
