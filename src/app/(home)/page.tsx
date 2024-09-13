import Posts from "@/components/molecules/blog/posts";
import { getAllPosts } from "@/lib/actions/post.action";
import { revalidatePath } from "next/cache";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const data = await getAllPosts();
  const posts: any = data?.posts;
  
  revalidatePath('/(home)');

  if (!posts) {
    return
  }

  return (
    <Posts posts={posts} />
  );
};

export default Page;