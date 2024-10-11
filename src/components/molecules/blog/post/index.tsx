import { formatDate, updateLinksTarget } from "@/utils/common";
import Head from "next/head";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PortraitIcon from "@mui/icons-material/Portrait";
import Image from "next/image";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import { Divider } from "antd";
import { getPostByCategory } from "@/lib/actions/post.action";
import Link from "next/link";

const Post = async ({ post }: { post: PostType }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts: any = (await getPostByCategory(post.category._id, post._id)).posts;

  const rawHTML = post.htmlContent?.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

  return (
    <div className="w-full">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.textContent} />
      </Head>
      <div className="bg-white rounded-lg drop-shadow-2xl ">
        {/* header */}
        <div className="relative w-[100%] min-h-[500px] overflow-hidden rounded-t-lg ">
          {/* overlay with opacity */}
          <div className="w-full h-full absolute bg-opacity-50 z-10 inset-0 bg-gradient-to-t from-black "></div>
          <Image
            alt="blog-img"
            fill
            className="absolute inset-0 "
            src={post?.imageUrl}
            priority={true}
            style={{ objectFit: "cover" }}
          />

          <div className="flex items-center gap-1  rounded-lg p-2 absolute right-6 bottom-6 z-20">
            <CalendarMonthIcon className="w-5 h-5 text-white" />
            <p className="text-white text-sm">
              {formatDate(new Date(post.updatedAt))}
            </p>
          </div>

          {/* title and author */}
          <div className="z-20 flex flex-col w-4/5 sm:w-3/4 py-7 absolute bottom-0 left-6">
            <div className="text-white py-6 text-sm font-medium items-center ">
              <span className="bg-gray-800 border border-gray-500 p-3 rounded-md">
                <TypeSpecimenIcon className="w-5 h-5 text-white" />{" "}
                <span>{`${post.category.title}`}</span>
              </span>
            </div>

            <h2 className="text-white md:text-4xl text-2xl font-medium ">
              {post.title}
            </h2>
            <h2 className="text-white md:text-xl text-lg py-4">
              {post.description}
            </h2>
            <div className="text-white text-sm font-medium items-center">
              <PortraitIcon className="w-6 h-6 text-white" />{" "}
              <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
            </div>
          </div>
        </div>

        {/* Post content */}
        <article
          dangerouslySetInnerHTML={{
            __html: rawHTML,
          }}
          className="text-gray-800 md:py-6 md:px-6 py-4 px-4 content article-container"
        ></article>

        {relatedPosts.length > 0 && (
          <div className="py-7 my-5 mx-auto w-11/12 text-gray-800 md:py-6 md:px-6 px-4 content article-container border-t">

            <h2 className="text-xl font-medium">Related Posts</h2>
            <div className="py-5 flex flex-col gap-2">
              {relatedPosts.map((item: any) => (
                <Link
                  key={item._id}
                  className="hover:text-blue-900 text-lg"
                  target="_blank"
                  href={{
                    pathname: `/category/${item?.category?.slug}/${item?.slug}`,
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
