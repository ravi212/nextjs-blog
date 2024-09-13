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
export const getAllPosts = async (categorySlug?: string | string[] | undefined) => {

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

        const posts = await Post.find(filters, "_id title slug createdAt updatedAt pinned featured tags textContent imageUrl").populate("author").populate("category").exec();

        if (posts) {
            return JSON.parse(JSON.stringify({ success:'ok', posts }))
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

        const featuredPost = await Post.find({featured: true});

        if (featuredPost.length > 0) {
          await Post.findOneAndUpdate({ _id: featuredPost[0]._id }, {featured: false});
        }

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