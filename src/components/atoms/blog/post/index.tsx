import Link from "next/link";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PortraitIcon from "@mui/icons-material/Portrait";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import StarsIcon from "@mui/icons-material/Stars";
import PushPinIcon from "@mui/icons-material/PushPin";

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
  description,
}) => {
  return (
    <Link
      href={{ pathname: `/category/${category?.slug}/${slug}` }}
      className="bg-white rounded-lg drop-shadow-2xl flex flex-col cursor-pointer "
    >
      <div
        className={`relative w-full md:min-h-[400px] min-h-[500px] overflow-hidden rounded-t-xl shadow-xl col-span-2 md:col-span-1 cursor-pointer`}
      >
        {/* overlay with opacity */}
        <div className="w-full h-full absolute bg-opacity-50 z-10 inset-0 bg-gradient-to-t from-black "></div>
        <Image
          alt="blog-img"
          fill
          className="absolute inset-0 object-cover"
          src={imageUrl}
          priority={true}
        />

        {pinned && (
          <div className="absolute right-2 top-2 z-20">
            {/* <p className="text-xs">Featured</p> */}
            <PushPinIcon className="text-white w-6 h-6" />
          </div>
        )}

        {featured && (
          <div className="absolute left-2 top-2">
            {/* <p className="text-xs">Featured</p> */}
            <StarsIcon className="text-gray-800 w-6 h-6 bg-white rounded-full" />
          </div>
        )}

        {/* title and author */}
        <div className="z-20 flex flex-col w-3/4 py-7 absolute bottom-0 left-5">
          <div className="text-white py-5 text-xs font-normal items-center ">
            <span className="bg-gray-800 border border-gray-500 p-2 rounded-md">
              <TypeSpecimenIcon className="w-4 h-4 text-white" />{" "}
              <span>{`${category.title}`}</span>
            </span>
          </div>

          <h2 className="text-white text-2xl font-medium ">{title}</h2>
          <h2 className="text-white text-base py-2">{description}</h2>
          <div className="text-white text-sm font-medium items-center">
            <PortraitIcon className="w-6 h-6 text-white" />{" "}
            <span>{`${author}`}</span>
          </div>
        </div>
      </div>

      <div className="md:p-6 p-4">
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

          <div className="flex flex-nowrap items-end gap-1 md:py-0 py-3">
            <CalendarMonthIcon className="w-6 h-6 text-gray-400" />
            <p className="text-gray-600 text-sm text-nowrap">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
