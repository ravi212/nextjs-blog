import Card from '@/components/atoms/admin/dashboard/Card'
import { Divider } from 'antd'
import Link from 'next/link'
import React from 'react'
import Users from '../users'
import Categories from '../categories'

const Dashboard = ({posts, authors, categories}: {posts: PostType[], authors: UserType[], categories: CategoryType[]}) => {

  return (
    <div className='w-full md:px-10 px-0'>
        {/* cards */}
        <section className='w-full py-10'>
            <div className='flex md:flex-row gap-6 flex-col justify-between w-full'>
                <Card title='Total Posts' count={posts.length}/>
                <Card title='Total Categories' count={categories.length}/>
                <Card title='Total Authors' count={authors.length}/>
            </div>
        </section>
        <Divider />
        <section className='py-6 gap-6 flex md:flex-row flex-col w-full'>
            {/* authors */}
            {authors && <div className='bg-white  shadow-lg rounded-lg md:w-1/2 w-full'>
            <div className='border-b p-6 flex items-center justify-between'>
                 <h2 className='text-lg text-gray-800 font-medium  '>Authors</h2>
                 <Link href={`/admin/user/list`} className={`font-base underline text-blue-500`}>View all</Link>
            </div>
               
               <Users users={authors} isAdminDashboard/>

            </div>}

            {/* categories */}
            {categories && <div className='bg-white  shadow-lg rounded-lg md:w-1/2 w-full'>
                <div className='border-b p-6 flex items-center justify-between'>
                 <h2 className='text-lg text-gray-800 font-medium  '>Categories</h2>
                 <Link href={`/admin/category/list`} className={`font-base underline text-blue-500`}>View all</Link>
                </div>
                <Categories categories={categories} isAdminDashboard/>
            </div>}

        </section>
         
         <Divider />

         {/* posts */}


    </div>
  )
}

export default Dashboard