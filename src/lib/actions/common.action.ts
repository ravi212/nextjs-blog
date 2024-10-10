"use server"
import { generateSlug } from "@/utils/common";
import { writeFileSync } from "fs";
import fs from 'fs';
import { join } from "path";

export async function upload(data: FormData) {
    const file: File | null = data.get('file') as unknown as File;
  
    if (!file) throw new Error('No file uploaded');
  
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public/uploads');
    
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${generateSlug(file.name.split('.')[0])}.${file.name.split('.')[1]}`;

    const path = join(uploadDir, fileName);

    const imageUrl = `/uploads/${fileName}`

    try {
        writeFileSync(path, buffer);
        return { success: true,  imageUrl };
    } catch (error) {
        console.log('Error while image upload', error);
        return { error };
    }

  }

  export const uploadAsBase64 = async (data: FormData) => {
    try {
        const file: File | null = data.get('file') as unknown as File;
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');
        if (!base64String) {
            return {error: 'Unable to upload file'}
        }
        return {success: 'ok', image: `data:image/png;base64,${base64String}`};
    } catch (e) {
        console.log(e)
        throw new Error("Unable to upload file");
    }

  }