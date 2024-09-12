import Link from 'next/link';
import dynamic from 'next/dynamic';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { getAllCategories } from '@/lib/actions/category.action';
import Aside from '../../../atoms/blog/layout/aside';
import Footer from '../../admin/layout/Footer';
const SideDrawer = dynamic(() => import('@/components/atoms/blog/layout/drawer'), {ssr: false})

const BgLayout = async ({ children }) => {
  
  const res: any = await getAllCategories()
  const categories = res?.categories;
  // let activeCatId = categories?.find((item: CategoryType) => item.slug == activeCategory)?._id;

  return (
    <div className='min-h-screen mx-auto w-full'>
      <div className='w-full'>
        <div className="bg-gray-700 shadow-xl p-4">
          <div className=' w-full mx-auto md:w-[100%] lg:w-[85%] xl:w-[80%] flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <div className='md:hidden flex'>
                <SideDrawer categories={categories}/>
              </div>
              
              <Link href={'/'} className="text-center text-white text-2xl font-semibold cursor-pointer hover:text-red-400">Ravi R.</Link>
            </div>
            <Link href={`https://ravi.rainaspace.com`} target='_blank' className='flex items-center gap-2 hover:text-red-400 text-white'>
              <RecentActorsIcon className='w-8 h-8' />
              <p className='text-base font-medium md:flex hidden'>Portfolio</p>
            </Link>
          </div>
   
        </div>
        <div className="flex flex-row md:p-6 p-4 gap-6 w-full mx-auto md:w-[100%] lg:w-[85%] xl:w-[80%]">
          <div className="w-[100%] container mx-auto">{children}</div>
          <div className='w-[30%] md:flex hidden'>
            <Aside categories={categories}/>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BgLayout;