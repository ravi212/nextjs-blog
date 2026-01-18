import Home from "@/components/molecules/blog/home";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllPosts } from "@/lib/actions/post.action";

export const revalidate = 15 * 60;

const Page = async () => {

  const data = await getAllPosts(false);
  const posts: any = data?.posts;

  const res: any = await getAllCategories();
  const categories = res?.categories;

  if (!posts) {
    return
  }

  return (
    <Home posts={posts} categories={categories}/>
  );
};

export default Page;