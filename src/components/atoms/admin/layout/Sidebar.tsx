"use client"
import React from 'react'
import { Layout, Menu } from 'antd';
import { ADMIN_NAV_ITEMS } from '@/constants/admin.const';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const { Sider } = Layout;

const SideBar = ({collapsed}: {collapsed: boolean}) => {
  
  const pathName = usePathname();

  return (
    <Sider width={250} trigger={null} collapsible collapsed={collapsed} className="w-full bg-[#0e1f39]">
        <div className='px-3'>
            <div className='py-6 flex flex-col gap-3 items-center'>
              {
                ADMIN_NAV_ITEMS.map((item: AdminNavItems, index: number) => (
                  <Link href={item.link} key={index} className={`p-2 w-full flex gap-3 items-center justify-start rounded-md text-center text-lg font-normal text-white hover:text-white hover:bg-red-400 cursor-pointer transition-all duration-100 ${pathName == item.link? 'bg-red-500' : ''}`}>
                    <item.icon />
                    {
                      !collapsed && <p>{item.title}</p>
                    }
                    
                  </Link>
                ))
              }
               
            </div>
        </div>
  </Sider>
  )
}

export default SideBar