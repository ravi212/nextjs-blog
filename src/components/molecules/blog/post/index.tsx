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
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.textContent} />
      </Head>
      <div className="bg-white rounded-lg drop-shadow-2xl ">
        <div className="relative w-[100%] min-h-[250px] overflow-hidden md:rounded-t-lg">
          <Image
            alt="blog-img"
            fill
            objectFit="cover"
            className="absolute inset-0"
            src={post?.imageUrl}
            priority={true}
          />
        </div>

        {/* header */}
        <div className="flex justify-between md:py-6 md:px-6 px-4 items-start py-8">
          <div className="flex items-center gap-1 py-0">
          <CalendarMonthIcon className="w-5 h-5 text-gray-400" />
            <p className="text-gray-600 text-sm">
              {formatDate(new Date(post.updatedAt))}
            </p>

          </div>
          <div className="flex items-center gap-1 py-0">
          <p className="text-gray-600 text-sm font-medium items-center">
              <TypeSpecimenIcon className="w-5 h-5 text-gray-400" />{" "}
              <span>{`${post.category.title}`}</span>
            </p>
          </div>
        </div>

        {/* title and author */}
        <div className="flex flex-col items-center justify-center md:p-6 p-4">
          <h2 className="text-gray-700 hover:underline md:text-4xl text-3xl font-medium pb-5">{post.title}</h2>
          <p className="text-gray-600 text-base font-medium items-center">
              <PortraitIcon className="w-6 h-6 text-gray-400" />{" "}
              <span>{`${post.author.firstName} ${post.author.lastName}`}</span>
            </p>
        </div>

        {/* Post content */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurifyServer.sanitize(rawHTML),
          }}
          className="text-gray-800 md:py-6 md:px-6 py-4 px-4"
        ></div>
      </div>
    </>
  );
};

export default Post;
