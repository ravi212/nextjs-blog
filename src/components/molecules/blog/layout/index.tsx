import { getAllCategories } from '@/lib/actions/category.action';
import Footer from './Footer';
import Navrbar from './Navrbar';

const BgLayout = async ({ children }) => {
  
  const res: any = await getAllCategories()
  const categories = res?.categories;

  return (
    <div className='min-h-screen mx-auto w-full'>
      <div className='w-full'>
        
        <Navrbar categories={categories} />

        <div className="flex flex-row md:p-6 p-3 gap-6 w-full mx-auto xl:w-4/5 min-h-screen">
          <div className="w-[100%] mx-auto mb-4">{children}</div>            
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default BgLayout;