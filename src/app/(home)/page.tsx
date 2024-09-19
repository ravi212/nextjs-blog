import Home from "@/components/molecules/blog/home";
import Posts from "@/components/molecules/blog/posts";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllPosts } from "@/lib/actions/post.action";
import { revalidatePath } from "next/cache";

const Page = async () => {

  const data = await getAllPosts(false);
  const posts: any = data?.posts;

  const res: any = await getAllCategories();
  const categories = res?.categories;

  revalidatePath('/(home)', 'page');

  if (!posts) {
    return
  }

  return (
    <Home posts={posts} categories={categories}/>
  );
};

export default Page;