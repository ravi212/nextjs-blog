import { getPostBySlug } from '@/lib/actions/post.action';
import { formatDate } from '@/utils/common';
import Head from 'next/head';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PortraitIcon from '@mui/icons-material/Portrait';
const Post = async ({slug}: {slug: string}) => {
  
  const data = await getPostBySlug(slug);
  const post: PostType | any = data?.post;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.textContent} />
      </Head>
      <div className="bg-white rounded-lg drop-shadow-2xl py-10 px-8">
      
      <div className="flex justify-between xl:flex-row items-start flex-col">
          <h2 className="text-2xl font-bold mb-2">
              <p className="text-gray-700 hover:underline">{post.title}</p>
              <p className="text-gray-600 text-base font-medium items-center pt-4"><PortraitIcon className="w-6 h-6 text-gray-400"/> <span>{`${post.author.firstName} ${post.author.lastName}`}</span></p>
          </h2>
          <div className="flex items-center gap-1 py-0">
            <CalendarMonthIcon className="w-6 h-6 text-gray-400"/>
            <p className="text-gray-600 text-sm ">{formatDate(new Date(post.updatedAt))}</p>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} className="text-gray-800"></div>
      </div>
    </>
  );
};

export default Post;