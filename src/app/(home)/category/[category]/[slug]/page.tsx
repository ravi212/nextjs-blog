import { getAllCategories } from "@/lib/actions/category.action";
import React, { lazy, Suspense } from "react";
const Post = lazy(() => import("@/components/molecules/blog/post"));
const Aside = lazy(() => import("@/components/atoms/blog/layout/aside"));

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string; category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const res: any = await getAllCategories();
  const categories = res?.categories;

  return (
    <div className="flex flex-row gap-6 w-full mx-auto md:w-[100%] min-h-screen">
      <div className="w-[100%] mx-auto mb-4">
        <Post slug={params?.slug} />
      </div>
      <Suspense>
        <Aside categories={categories} />
      </Suspense>
    </div>
  );
};

export default Page;
