import Dashboard from '@/components/molecules/admin/dashboard'
import { getAllCategories } from '@/lib/actions/category.action';
import { getAllPosts } from '@/lib/actions/post.action'
import { getAllUsers } from '@/lib/actions/user.action';
import React from 'react'

const Page = async () => {

  const posts = (await getAllPosts(true))?.posts;
  const authors = (await getAllUsers())?.users;
  const categories = (await getAllCategories())?.categories;

  return (
    <Dashboard posts={posts} categories={categories} authors={authors} />
  )
}

export default Page