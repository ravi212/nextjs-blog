import dbConnect from "./config/db";

export async function register() {
    await dbConnect()
}