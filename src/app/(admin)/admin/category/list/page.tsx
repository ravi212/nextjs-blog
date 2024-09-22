"use client"
import CategoryEdit from '@/components/molecules/admin/category'
import { getAllCategories } from '@/lib/actions/category.action'
import { Modal } from 'antd'
import dynamic from 'next/dynamic'
const Categories = dynamic(() => import('@/components/molecules/admin/categories'), {ssr: false}) 
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [categories, setCategories] = useState<PostType[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState<any>(null)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const result = await getAllCategories(true);
    if (result?.success) {
      setCategories(result?.categories)
      setOpenModal(false)
      setEditId(null)
    }
  }

  const handleOpenEditModal = (id: string) => {
    setEditId(id)
    setOpenModal(!openModal)
  }

  return (
    <div>
      <div className='py-6 flex justify-between items-center'>
        <h3 className="text-2xl font-medium">Categories</h3>
        <span onClick={() => setOpenModal(!openModal)} className='bg-red-500 p-3 rounded-md text-white hover:text-white cursor-pointer'>
            Add New
        </span>
      </div>
      <Categories categories={categories} reGetCategories={getCategories} openEditModal={handleOpenEditModal}/>

      <Modal title={editId? 'Edit Category' : 'Add Category'} footer={null} open={openModal} onCancel={() => setOpenModal(!openModal)} >
        <CategoryEdit categoryId={editId} closeModal={getCategories} />
      </Modal>
    </div>
  )
}

export default Page