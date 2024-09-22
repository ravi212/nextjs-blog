'use server';
import { compareSync, hashSync } from "bcrypt-ts";
import User from "@/models/user.model";
import connectToDatabase from "@/config/db";
import { UserRole } from "@/enum/enum";

const saltRounds = 12

//create user
export const createUser = async (payload: UserType) => {

    try {

        const isUser = await User.findOne({email: payload?.email})
    
        if (isUser) {
            return {error: "User already exists!"}
        }
        
        const hashedPassword = hashSync(payload.password, saltRounds)
        const userData = {...payload, password: hashedPassword}

        const newUser = new User(userData);
        const user = await newUser.save();

        if (user) {
            return  {success: 'ok', message: "User created successfully!"}
        } 
    
        return {error: "Error Creating User!"}
    } catch (err) {
        return {error: "Server Error!", err}
    }

}


// edit user
export const editUser = async (id: string, payload: UserType) => {

    try {

        const hashedPassword = hashSync(payload.password, saltRounds)
        const userData = {...payload, password: hashedPassword}

        const user = await User.findByIdAndUpdate(id, userData);

        if (user) {
            return {success: 'ok', user , message: "User updated successfully"}
        } 
    
        return {error: "Error Updating User!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}


// Toggle pinned post checkbox to update on database
export const toggleLocked = async (_id: string | undefined) => {

    try {
        
        const user = await User.findById(_id);
        const isLocked = user?.isLocked;

        const updatedUser = await User.findOneAndUpdate({ _id }, {isLocked: !isLocked});

        if (updatedUser) {
            return { success:'ok', message: "Updated User!" }
        }

        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}


// get user by id
export const getUserById = async (_id: string | undefined) => {

    try {
        const user = await User.findOne({_id})

        if (user) {
            return JSON.parse(JSON.stringify({success: 'ok', user}))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}


// get user by role
export const getUsersByRole = async (role: string) => {

    try {
        const users = await User.find({role, isLocked: {$ne: true}})

        if (users) {
            return JSON.parse(JSON.stringify({success: 'ok', users}))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// get list of users
export const getAllUsers = async () => {

    try {
        const users = await User.find({role: { $ne: UserRole.ADMIN }})

        if (users) {
            return JSON.parse(JSON.stringify({ success:'ok', users }))
        } 
    
        return {error: "Not Found!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// delete post
export const deleteUser = async (_id: string) => {

    try {
        const res = await User.findByIdAndDelete(_id)

        if (res) {
            return {success: 'ok', message: "User deleted successfully"}
        } 
    
        return {error: "Error deleting User!"}

    } catch (err) {
        return {error: "Server Error!", err}
    }

}

// User and Auth
export const logInUser = async (payload: any) => {

    const {username, password} = payload;

    try {
        await connectToDatabase()

        const isUserLocked = await User.findOne({isLocked: true, username})

        if (isUserLocked) {
            return {error: "User is Locked! Contact Admin"};
        }

        const user = await User.findOne({username})

        if (user) {
        
            if (compareSync(password, user.password)) {
                user.password = undefined;
                return JSON.parse(JSON.stringify({success: 'ok', user: user}))
            } else {
                return {error: "Password mismatch!" }
            }
        }
    
        return {error: "Invalid Username!"};

    } catch (e) {
        return {error: "Server Error!"};
    }

}
