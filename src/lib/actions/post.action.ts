"use server";

import connectToDatabase from "@/config/db";
import Category from "@/models/category.model";
import Post from "@/models/post.model";
import "@/models/user.model";
import { revalidatePath } from "next/cache";

// Create post
export const createPost = async (payload: PostType) => {
  try {
    const isPost = await Post.findOne({ slug: payload?.slug });

    if (isPost) {
      return { error: "Post already exists!" };
    }

    const newPost = new Post(payload);

    const post = await newPost.save();

    if (post) {
      return JSON.parse(
        JSON.stringify({ success: "ok", message: "Post created successfully" })
      );
    }

    return { error: "Error Creating Post!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// edit post
export const editPost = async (id: string | undefined, payload: PostType) => {
  try {
    const post = await Post.findByIdAndUpdate(id, payload);

    if (post) {
      return JSON.parse(
        JSON.stringify({
          success: "ok",
          post,
          message: "Post updated successfully",
        })
      );
    }

    return { error: "Error Updating Post!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// get posts for home page
export const getHomePosts = async () => {
  try {
    await connectToDatabase();

    const baseFilter = { inActive: false };

    const pinnedPost = await Post.findOne({
      ...baseFilter,
      pinned: true,
    })
      .populate("category")
      .populate("author")
      .sort({ updatedAt: -1 });

    const featuredPosts = await Post.find({
      ...baseFilter,
      featured: true,
      pinned: false,
    })
      .populate("category")
      .populate("author")
      .sort({ updatedAt: -1 });


    const recentPosts = await Post.find({
      ...baseFilter,
      pinned: false,
      featured: false,
    })
      .populate("category")
      .populate("author")
      .sort({ updatedAt: -1 })
      .limit(4);

    return JSON.parse(
      JSON.stringify({
        success: "ok",
        pinnedPost,
        featuredPosts,
        recentPosts,
      })
    );
  } catch (err) {
    return { error: "Server Error!", err };
  }
};


// get list of posts
export const getAllPosts = async (
  isAdmin: boolean,
  categorySlug?: string | string[] | undefined,
  query?: any
) => {
  let page = 1;
  let pageSize = 10;

  if (query) {
    page = Number(query.page) || 1;  
    pageSize = Number(query.pageSize) || 10; 
  }

  const skip = Math.max(0, (page - 1) * pageSize);
  const itemsPerPage = pageSize;

  try {
    await connectToDatabase();
    let filters: any = isAdmin ? {} : { inActive: false };

    //category filters
    if (categorySlug && categorySlug != "all") {
      const category = await Category.findOne({ slug: categorySlug });

      filters = { ...filters, category: category._id };
    } else {
      delete filters.category;
    }

    const tempPosts = await Post.find(
      filters,
      "_id title inActive description slug createdAt updatedAt pinned featured tags textContent imageUrl"
    )
      .populate("author")
      .populate("category")
      .sort({updatedAt: -1})
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    let posts = tempPosts;

    if (!isAdmin) {
      //sort pinned at top
      posts = tempPosts.sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    const totalCount = await Post.countDocuments();

    if (posts) {
      if(isAdmin){
        revalidatePath('(admin)/admin/post/list');
      }
      return JSON.parse(JSON.stringify({ success: "ok", posts, totalCount }));
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// Toggle pinned post checkbox to update on database
export const toggleFeatured = async (_id: string | undefined) => {
  try {
    // const featuredPost = await Post.find({featured: true});

    // if (featuredPost.length > 0) {
    //   await Post.findOneAndUpdate({ _id: featuredPost[0]._id }, {featured: false});
    // }

    const postFeatured = await Post.findById(_id, "featured");
    const isFeatured = postFeatured?.featured;

    const post = await Post.findOneAndUpdate(
      { _id },
      { featured: !isFeatured }
    );

    if (post) {
      return JSON.parse(
        JSON.stringify({ success: "ok", message: "Updated Post!" })
      );
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// Toggle active status checkbox to update on database
export const toggleActive = async (_id: string | undefined) => {
  try {
    const postActive = await Post.findById(_id, "inActive");
    const isActive = postActive?.inActive;

    const post = await Post.findOneAndUpdate({ _id }, { inActive: !isActive });

    if (post) {
      return JSON.parse(
        JSON.stringify({ success: "ok", message: "Updated Post!" })
      );
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// Toggle pinned post checkbox to update on database
export const togglePinned = async (_id: string | undefined) => {
  try {
    const pinnedPost = await Post.find({ pinned: true });

    if (pinnedPost.length > 0) {
      await Post.findOneAndUpdate(
        { _id: pinnedPost[0]._id },
        { pinned: false }
      );
    }

    const postPinned = await Post.findById(_id, "pinned");
    const isPinned = postPinned?.pinned;

    const post = await Post.findOneAndUpdate({ _id }, { pinned: !isPinned });

    if (post) {
      return JSON.parse(
        JSON.stringify({ success: "ok", message: "Updated Post!" })
      );
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// get post by id
export const getPostById = async (_id: string | undefined) => {
  try {
    const post = await Post.findOne({ _id });

    if (post) {
      return JSON.parse(JSON.stringify({ success: "ok", post }));
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

//Get by category
export const getPostByCategory = async (
  category: string | undefined,
  postId: string | null = null
) => {
  try {
    const posts = postId ? await Post.find({
      $and: [{ _id: { $ne: postId } }, { category }],
    }, "_id title")
    .sort({ updatedAt: -1 })
    :
    await Post.find({category},"_id title")
      .sort({ updatedAt: -1 })

    if (posts) {
      return JSON.parse(JSON.stringify({ success: "ok", posts }));
    }

    return JSON.parse(JSON.stringify({ error: "Not Found!" }));
  } catch (err) {
    return JSON.parse(JSON.stringify({ error: "Server Error!", err }));
  }
};

// get post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    const post = await Post.findOne({
      $and: [{ slug }, { inActive: false }],
    })
      .populate("category")
      .populate("author")
      .populate({
        path: "relatedPosts",
        select: "title slug category",
        populate: {
            path: "category",
            select: "slug"
        }
      });

    if (post) {
      return JSON.parse(JSON.stringify({ success: "ok", post }));
    }

    return { error: "Not Found!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};

// delete post
export const deletePost = async (_id: string) => {
  try {
    const res = await Post.findByIdAndDelete(_id);

    if (res) {
      return JSON.parse(
        JSON.stringify({ success: "ok", message: "Post deleted successfully" })
      );
    }

    return { error: "Error deleting Post!" };
  } catch (err) {
    return { error: "Server Error!", err };
  }
};
