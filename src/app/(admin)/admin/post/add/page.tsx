import PostEdit from '@/components/molecules/admin/post'
import { UserRole } from '@/enum/enum';
import { getAllCategories } from '@/lib/actions/category.action';
import { getAllPosts } from '@/lib/actions/post.action';
import { getUsersByRole } from '@/lib/actions/user.action';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { revalidatePath } from 'next/cache';
import Link from 'next/link'
import React from 'react'

const Page = async () => {

  const response: any = await getAllCategories(true);
  const categories = response?.categories;
  
  const usersResponse: any = await getUsersByRole(UserRole.AUTHOR);
  const authors = usersResponse?.users;

  revalidatePath(`/(admin)/admin/post/add`, 'page');

  return (
    <div className='px-10 '>
    <div className='py-6 flex gap-4 items-center'>
     <Link href={`/admin/post/list`}>
        <ArrowBackIcon className='cursor-pointer' />
      </Link>
       <h3 className="text-xl font-medium">Add Post</h3>
    </div>
      <PostEdit authors={authors} categories={categories} />
    </div>
    
  )
}

export default Page