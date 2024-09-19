import React from "react";
import Link from "next/link";
import FeaturedPost from "@/components/atoms/blog/featured-post";
import PinnedPost from "@/components/atoms/blog/pinned-post";
import { Divider } from "antd";
import RecentPost from "@/components/atoms/blog/recent-post";
import { getAllCategories } from "@/lib/actions/category.action";
import CategoryList from "@/components/atoms/blog/category-list";

const Home = ({ posts, categories }: { posts: PostType[], categories: CategoryType[] }) => {
  const pinnedPost = posts.find((post: PostType) => post?.pinned);
  const featuredPosts = posts.filter(
    (post: PostType) => post?.featured && !post?.pinned
  );
  
  const recentPosts = posts.sort(
    // @ts-ignore
    (a, b) => new Date(a.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div>
      {/* pinned post */}
      {pinnedPost && <PinnedPost post={pinnedPost} />}


      {/* categories */}
        <CategoryList categories={categories} />
      {/* featured posts */}
      <Divider />
      <h2 className="text-center text-lg py-6">Featured Posts</h2>
      <Divider />
      {featuredPosts && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {featuredPosts.map((post: PostType, index: number) => (
            <FeaturedPost key={index} post={post} index={index} />
          ))}
        </div>
      )}

      <Divider />
      <div className="flex justify-between sm:flex-row flex-col py-6 px-3">
        <div></div>
        <h2 className="text-center text-lg mx-auto">Recent Posts</h2>
        <Link
          href={`/category/all`}
          className="text-center text-sm text-blue-500 underline"
        >
          View All
        </Link>
      </div>

      <Divider />

      {/* recent posts */}
      {recentPosts && (
        <div className="grid grid-cols-2 gap-4">
          {recentPosts.splice(0, 4).map((post: PostType, index: number) => (
            <RecentPost key={index} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
