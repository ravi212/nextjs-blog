type PostType = {
    _id?: string;
    title: string;
    description: string;
    slug: string;
    textContent: string;
    htmlContent: string;
    imageUrl: string;
    featured: boolean;
    pinned: boolean;
    tags: string[];
    author: any;
    category?: any;
    createdAt?: any;
    updatedAt?: any;
}

type CategoryType = {
    _id?: string;
    title: string;
    slug: string;
    createdAt?: any;
}

type QueryType = {
    page: number;
    pageSize: number;
}