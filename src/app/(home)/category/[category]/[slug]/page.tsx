import { siteMetaData } from "@/constants/siteMetaData";
import { getAllCategories } from "@/lib/actions/category.action";
import { getPostBySlug } from "@/lib/actions/post.action";
import { revalidatePath } from "next/cache";
import React, { lazy, Suspense } from "react";
const Post = lazy(() => import("@/components/molecules/blog/post"));
const Aside = lazy(() => import("@/components/atoms/blog/layout/aside"));


export const generateMetadata = async ({ params }) => {

  const data = await getPostBySlug(params?.slug);
  const post: PostType | any = data?.post;

  let imageList = [
    siteMetaData.socialBanner
  ]

  if (post?.imageUrl) {
    imageList = [`${siteMetaData.siteUrl}${post?.imageUrl}`]
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
      locale: 'en_US',
      type: 'website',
    },
  }
}

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string; category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const res: any = await getAllCategories();
  const categories = res?.categories;

  const data = await getPostBySlug(params?.slug);
  const post: PostType | any = data?.post;

  revalidatePath(`/(home)/category/[category]/[slug]`, 'page');

  return (
    <div className="flex flex-row gap-6 w-full mx-auto md:w-[100%] min-h-screen">
      <div className="w-[100%] mx-auto mb-4">
        <Post post={post} />
      </div>
      <Suspense>
        <Aside categories={categories} />
      </Suspense>
    </div>
  );
};

export default Page;
