import { getPostBySlug } from "@/lib/actions/post.action";
import { formatDate } from "@/utils/common";
import Head from "next/head";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PortraitIcon from "@mui/icons-material/Portrait";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";

const Post = async ({ slug }: { slug: string }) => {
  const data = await getPostBySlug(slug);
  const post: PostType | any = data?.post;

  revalidatePath(`/(home)/category/[category]/[slug]`, 'page');

  if (!post) {
    return <div>Post not found</div>;
  }

  const window = new JSDOM("").window;
  const DOMPurifyServer = DOMPurify(window);

  const rawHTML = post?.htmlContent;

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
            objectFit="cover"
            className="absolute inset-0 "
            src={post?.imageUrl}
            priority={true}
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

          <h2 className="text-white md:text-4xl text-2xl font-medium ">{post.title}</h2>
          <h2 className="text-white text-base py-4">{post.description}</h2>
          <div className="text-white text-sm font-medium items-center">
              <PortraitIcon className="w-6 h-6 text-white" />{" "}
              <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
            </div>
        </div>
        </div>

        {/* Post content */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurifyServer.sanitize(rawHTML),
          }}
          className="text-gray-800 md:py-6 md:px-6 py-4 px-4 content"
        ></div>
      </div>
    </div>
  );
};

export default Post;
