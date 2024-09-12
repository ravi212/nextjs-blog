"use client"
import React from 'react'
import { Drawer } from 'antd'
import CloseIcon from '@mui/icons-material/Close';
import { ADMIN_NAV_ITEMS } from '@/constants/admin.const';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideDrawer = ({isOpen, onClose}: SideMenuProps) => {

    const pathName = usePathname()

  return (
    <Drawer
        placement="left"
        width={320}
        open={isOpen}
        closeIcon={false}
        mask={false}
        style={{backgroundColor: 'rgba(14, 31, 57)'}}
    >

        <div className='px-3'>
            <div className='flex justify-between items-start py-4'>
                <div className='flex items-center justify-center'>
                    <p className="text-2xl font-medium text-primaryColor text-white">Ravi R.</p>
                    {/* <p className="text-lg font-normal text-primaryColor">(Admin Panel)</p> */}
                </div>
                <CloseIcon className='cursor-pointer text-white' onClick={onClose} />
            </div>

            <div className='py-6 flex flex-col gap-3 items-center'>
              {
                ADMIN_NAV_ITEMS.map((item: AdminNavItems, index: number) => (
                  <Link href={item.link} key={index} className={`p-2 w-full flex gap-3 items-center justify-start rounded-md text-center text-lg font-normal text-white hover:text-white hover:bg-red-400 cursor-pointer transition-all duration-100 ${pathName == item.link? 'bg-red-500' : ''}`}>
                    <item.icon />
                    {
                     <p className='text-white'>{item.title}</p>
                    }
                    
                  </Link>
                ))
              }
               
            </div>
        </div>



    </Drawer>
  )
}

export default SideDrawer