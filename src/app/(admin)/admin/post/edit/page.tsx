import PostEdit from '@/components/molecules/admin/post'
import { UserRole } from '@/enum/enum';
import { getAllCategories } from '@/lib/actions/category.action';
import { getPostById } from '@/lib/actions/post.action';
import { getUsersByRole } from '@/lib/actions/user.action';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react'

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string  | undefined };
}) => {

  const response: any = await getAllCategories(true);
  const categories = response?.categories;

  const usersResponse: any = await getUsersByRole(UserRole.AUTHOR);
  const authors = usersResponse?.users;

  const postId = searchParams?.id;
  const postResponse = await getPostById(postId);
  const post = JSON.parse(JSON.stringify(postResponse?.post));

  revalidatePath(`/(admin)/admin/post/edit`, 'page');

  return (
    <div className='px-10 '>
    <div className='py-6 gap-4 flex items-center'>
      <Link href={`/admin/post/list`}>
        <ArrowBackIcon className='cursor-pointer' />
      </Link>
      
       <h3 className="text-xl font-medium">Edit Post</h3>
    </div>
      <PostEdit authors={authors} categories={categories} post={post} />
    </div>
    
  )
}

export default Page