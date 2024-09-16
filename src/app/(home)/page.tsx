import Posts from "@/components/molecules/blog/posts";
import { getAllPosts } from "@/lib/actions/post.action";
import { revalidatePath } from "next/cache";

const Page = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const category = params?.category
  const queryParams = {page: searchParams?.page, pageSize: searchParams?.pageSize};

  const data = await getAllPosts(category, queryParams);
  const posts: any = data?.posts;
  const totalCount: number = data?.totalCount;

  revalidatePath('/(home)', 'page');

  if (!posts) {
    return
  }

  return (
    <Posts posts={posts} totalCount={totalCount}/>
  );
};

export default Page;