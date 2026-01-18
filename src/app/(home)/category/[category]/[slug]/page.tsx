import Empty from "@/components/atoms/common/Empty";
import Loading from "@/components/atoms/common/Loading";
import { siteMetaData } from "@/constants/siteMetaData";
import { getAllCategories } from "@/lib/actions/category.action";
import { getPostBySlug } from "@/lib/actions/post.action";
import Link from "next/link";
import React, { lazy, Suspense } from "react";
const Post = lazy(() => import("@/components/molecules/blog/post"));
const Aside = lazy(() => import("@/components/atoms/blog/layout/aside"));

export const generateMetadata = async ({ params }) => {
  const data = await getPostBySlug(params?.slug);
  const post: PostType | any = data?.post;

  if (!post) {
    return;
  }

  let imageList = [siteMetaData.socialBanner];

  if (post?.imageUrl) {
    imageList = [`${siteMetaData.siteUrl}${post?.imageUrl}`];
  }

  return {
    title: `${post?.title}`,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: siteMetaData.siteUrl + `/${params.category}/${params.slug}`,
      siteName: siteMetaData.title,
      publishedTime: new Date(post?.createdAt).toISOString(),
      modifiedime: new Date(post?.updatedAt).toISOString(),
      author: post?.author,
      images: imageList,
      locale: "en_US",
      type: "website",
    },
  };
};

export const revalidate = 15 * 60;

const Page = async ({
  params,
}: {
  params: { slug: string; category: string };
}) => {
  const res: any = await getAllCategories();
  const categories = res?.categories;

  const data = await getPostBySlug(params?.slug);
  const post: PostType | any = data?.post;

  if (!post || post.inActive) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-10">
        <Empty />
        <h3 className="text-gray-800 text-center text-2xl font-medium">
          <p>Sorry! Post in not available.</p>
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
      <Suspense fallback={<Loading />}>
        <div className="w-[100%] mx-auto mb-4">
          <Post post={post} />
        </div>

        <Aside categories={categories} />
      </Suspense>
    </div>
  );
};

export default Page;
