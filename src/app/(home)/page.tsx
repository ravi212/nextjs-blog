import Home from "@/components/molecules/blog/home";
import { getAllCategories } from "@/lib/actions/category.action";
import { getHomePosts } from "@/lib/actions/post.action";

export const revalidate = 15 * 60;

const Page = async () => {

  const data = await getHomePosts();

  const res: any = await getAllCategories();
  const categories = res?.categories;

  if (!data || !data?.success) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-10">
        <h3 className="text-gray-800 text-center text-2xl font-medium">
          <p>Sorry! The list is empty</p>
        </h3>
      </div>
    );
  }

  return (
    <Home postsData={data} categories={categories}/>
  );
};

export default Page;