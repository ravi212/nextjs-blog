import Link from "next/link";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PortraitIcon from "@mui/icons-material/Portrait";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import StarsIcon from '@mui/icons-material/Stars';
import PushPinIcon from '@mui/icons-material/PushPin';

const BlogPost = ({
  title,
  textContent,
  date,
  slug,
  imageUrl,
  pinned,
  featured,
  hashTags,
  author,
  category,
}) => {
  return (
    <Link
      href={{ pathname: `/category/${category?.slug}/${slug}`}}
      className="bg-white md:rounded-lg  drop-shadow-2xl flex flex-col cursor-pointer"
    >
      <div className="relative w-[100%] min-h-[250px] overflow-hidden md:rounded-t-lg">
        <Image
          alt="blog-img"
          fill
          style={{objectFit: "cover"}}
          className="absolute inset-0"
          src={imageUrl}
          priority={true}
        />

        {
          pinned && <div className="absolute right-2 top-2">
            {/* <p className="text-xs">Featured</p> */}
            <PushPinIcon className="text-white w-6 h-6"/>
          </div>
        }

        {
          featured && <div className="absolute left-2 top-2">
            {/* <p className="text-xs">Featured</p> */}
            <StarsIcon className="text-white w-6 h-6 bg-yellow-600 rounded-full"/>
          </div>
        }


      </div>
      <div className="md:p-6 p-4">
        <div className="flex justify-between md:flex-row items-start flex-col ">
          <h2 className="md:text-2xl text-xl font-bold ">
            <p className="text-gray-700 hover:underline">{title}</p>
            <p className="text-gray-600 md:text-base text-sm font-medium items-center pt-3">
              <PortraitIcon className="w-6 h-6 text-gray-400" />{" "}
              <span>{author}</span>
            </p>
          </h2>
          <div className="flex items-center gap-1 md:py-0 py-3">
            <TypeSpecimenIcon className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600 text-sm">{category.title}</span>
          </div>
        </div>
        <p className="text-gray-800 text-base py-3">{textContent}...</p>{" "}
        <div className="flex flex-col md:flex-row gap-3 justify-between md:pt-3 pt-3 md:py-3 py-0">
          <div className="flex gap-3 flex-wrap pr-2">
            {hashTags &&
              hashTags?.map((item: string, index: number) => (
                <span
                  key={`${item}-${index}`}
                  className="px-2 py-1 rounded-lg bg-gray-400 text-white text-sm font-normal"
                >
                  #{item}
                </span>
              ))}
          </div>

          <div className="flex flex-nowrap items-center gap-1 md:py-0 py-3">
            <CalendarMonthIcon className="w-6 h-6 text-gray-400" />
            <p className="text-gray-600 text-sm text-nowrap">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
