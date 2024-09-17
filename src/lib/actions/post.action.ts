"use server"

import connectToDatabase from "@/config/db";
import Category from "@/models/category.model";
import Post from "@/models/post.model";
import "@/models/user.model";

// Create post
export const createPost = async (payload: PostType) => {

    try {

        const isPost = await Post.findOne({slug: payload?.slug})
    
        if (isPost) {
            return {error: "Post already exists!"}
        }
    
        const newPost = new Post(payload);

        const post = await newPost.save();

        if (post) {
            return  JSON.parse(JSON.stringify({success: 'ok', message: "Post created successfully"}))
        } 
    
        return {error: "Error Creating Post!"}
    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// edit post
export const editPost = async (id: string | undefined, payload: PostType) => {

    try {

        const post = await Post.findByIdAndUpdate(id, payload);

        if (post) {
            return JSON.parse(JSON.stringify({success: 'ok', post , message: "Post updated successfully"}))
        } 
    
        return {error: "Error Updating Post!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get list of posts
export const getAllPosts = async (isAdmin: boolean, categorySlug?: string | string[] | undefined, query?: any) => {

    let page = 1;
    let pageSize = 10;

    if (query) {
        page = query?.page;
        pageSize = query?.pageSize;
    }

    const skip = (page - 1) * pageSize;
    const itemsPerPage = pageSize;

    try {
        await connectToDatabase();
        let filters: any = {};    
        
        //category filters
        
        if (categorySlug) {
            const category = await Category.findOne({slug: categorySlug});

            filters = {...{category: category._id}}
        } else {
            delete filters.category;
        }
        
        const tempPosts = await Post.find(filters, "_id title slug createdAt updatedAt pinned featured tags textContent imageUrl")
        .populate("author")
        .populate("category")
        .skip(skip)
        .limit(itemsPerPage)
        .exec()

        let posts = tempPosts;

        if (!isAdmin) {
        //sort pinned at top
        posts = tempPosts.sort((a, b) => {
            if(a.pinned && !b.pinned) {
              return -1;
            }else if (!a.pinned && b.pinned){
                return 1;
            }else {
                return 0
            }
            });
        }

        const totalCount = await Post.countDocuments();

        if (posts) {
            return JSON.parse(JSON.stringify({ success:'ok', posts, totalCount }))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        console.log(err)
        return {error: "Server Error!", err}
    }

}

// Toggle pinned post checkbox to update on database
export const toggleFeatured = async (_id: string | undefined) => {

    try {

        // const featuredPost = await Post.find({featured: true});

        // if (featuredPost.length > 0) {
        //   await Post.findOneAndUpdate({ _id: featuredPost[0]._id }, {featured: false});
        // }

        const postFeatured = await Post.findById(_id, "featured");
        const isFeatured = postFeatured?.featured

        const post = await Post.findOneAndUpdate({ _id }, {featured: !isFeatured});

        if (post) {
            return JSON.parse(JSON.stringify({ success:'ok', message: "Updated Post!" }))
        }

        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// Toggle pinned post checkbox to update on database
export const togglePinned = async (_id: string | undefined) => {

    try {

        const pinnedPost = await Post.find({pinned: true});

        if (pinnedPost.length > 0) {
          await Post.findOneAndUpdate({ _id: pinnedPost[0]._id }, {pinned: false});
        }

        const postPinned = await Post.findById(_id, "pinned");
        const isPinned = postPinned?.pinned

        const post = await Post.findOneAndUpdate({ _id }, {pinned: !isPinned});

        if (post) {
            return JSON.parse(JSON.stringify({ success:'ok', message: "Updated Post!" }))
        }

        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get post by id
export const getPostById = async (_id: string | undefined) => {

    try {

        const post = await Post.findOne({_id})

        if (post) {
            return JSON.parse(JSON.stringify({success: 'ok', post}))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}


// get post by slug
export const getPostBySlug = async (slug: string) => {
    
    try {

        const post = await Post.findOne({slug}).populate("category").populate("author")

        if (post) {
            return JSON.parse(JSON.stringify({success: 'ok', post}))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// delete post
export const deletePost = async (_id: string) => {

    try {

        const res = await Post.findByIdAndDelete(_id)

        if (res) {
            return JSON.parse(JSON.stringify({success: 'ok', message: "Post deleted successfully"}))
        } 
    
        return {error: "Error deleting Post!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}