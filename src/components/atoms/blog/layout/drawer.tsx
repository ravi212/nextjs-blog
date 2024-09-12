"use client"
import React, { useState } from 'react'
import { Drawer } from 'antd'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ListIcon from "@mui/icons-material/List";

const SideDrawer = ({categories}: {categories: CategoryType[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams()
  const category = searchParams.get('category');
  const activeCatId = categories?.find((cat: CategoryType) => cat.slug == category)?._id

  return (
    <div>
    <ListIcon onClick={() => setIsOpen(!isOpen)} className='text-white w-7 h-7 cursor-pointer'/>
    <Drawer
        placement="left"
        width={320}
        open={isOpen}
        closeIcon={false}
        mask={false}
        style={{backgroundColor: '#fff'}}
    >

        <div className='px-3'>
            <div className='flex justify-between items-start py-4'>
                <div className='flex items-center justify-center'>
                    <p className="text-2xl font-medium text-primaryColor">Ravi R.</p>
                    {/* <p className="text-lg font-normal text-primaryColor">(Admin Panel)</p> */}
                </div>
                <CloseIcon className='cursor-pointer text-primaryColor' onClick={() => setIsOpen(!isOpen)} />
            </div>

            <div className='py-6 flex flex-col gap-3 items-center'>
            <Link className={`${!activeCatId ? 'text-red-400 text-lg font-medium': ''} text-base hover:text-red-400 hover:text-lg transition-all `} href={`/blog`}>All</Link>
              {
                  categories?.map((cat: CategoryType, index: number) => (
                  <Link className={`${activeCatId == cat._id ? 'text-red-400 text-lg font-medium': ''} text-primaryColor text-base hover:text-red-400 hover:text-lg transition-all `} key={index} href={`/blog?category=${cat.slug}`}>{cat.title}</Link>
              ))
              }
               
            </div>
        </div>



    </Drawer>
    </div>

  )
}

export default SideDrawer