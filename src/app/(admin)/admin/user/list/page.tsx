"use client"
import UserEdit from '@/components/molecules/admin/user'
import Users from '@/components/molecules/admin/users'
import { getAllUsers } from '@/lib/actions/user.action'
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [users, setUsers] = useState<PostType[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState<any>(null)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const result = await getAllUsers();
    if (result?.success) {
      setUsers(result?.users)
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
        <h3 className="text-2xl font-medium">Users</h3>
        <span onClick={() => setOpenModal(!openModal)} className='bg-red-500 p-3 rounded-md text-white hover:text-white cursor-pointer'>
            Add New
        </span>
      </div>
      <Users users={users} reGetUsers={getUsers} openEditModal={handleOpenEditModal}/>

      <Modal title={editId? 'Edit User' : 'Add User'} footer={null} open={openModal} onCancel={() => setOpenModal(!openModal)} >
        <UserEdit userId={editId} closeModal={getUsers} />
      </Modal>
    </div>
  )
}

export default Page