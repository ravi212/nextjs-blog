"use server"

import connectToDatabase from "@/config/db";
import Category from "@/models/category.model"

// Create Category
export const createCategory = async (payload: CategoryType) => {

    try {

        const isCategory = await Category.findOne({slug: payload?.slug})
    
        if (isCategory) {
            return {error: "Category already exists!"}
        }
    
        const newCategory = new Category(payload);

        const category = await newCategory.save();

        if (category) {
            return  {success: 'ok', message: "Category created successfully"}
        } 
    
        return {error: "Error Creating Category!"}
    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// edit Category
export const editCategory = async (id: string, payload: CategoryType) => {

    try {

        const category = await Category.findByIdAndUpdate(id, payload);

        if (category) {
            return {success: 'ok', category , message: "Category updated successfully"}
        } 
    
        return {error: "Error Updating Category!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get list of Categorys
export const getAllCategories = async () => {

    try {
        await connectToDatabase();
        const categories = await Category.find({}, '_id title slug createdAt')

        if (categories) {
            return { success:'ok', categories }
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get Category by id
export const getCategoryById = async (_id: string | undefined) => {

    try {
        const category = await Category.findOne({_id})

        if (category) {
            return {success: 'ok', category}
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get Category by slug
export const getCategoryBySlug = async (slug: string) => {
    
    try {

        const category = await Category.findOne({slug})

        if (category) {
            return {success: 'ok', category}
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// delete Category
export const deleteCategory = async (_id: string) => {

    try {
        const res = await Category.findByIdAndDelete(_id)

        if (res) {
            return {success: 'ok', message: "Category deleted successfully"}
        } 
    
        return {error: "Error deleting Category!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}