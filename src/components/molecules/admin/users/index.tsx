"use client";
import React from "react";
import { Checkbox, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { deleteCategory } from "@/lib/actions/category.action";
import { formatDate } from "@/utils/common";
import { toggleLocked } from "@/lib/actions/user.action";


const Users = ({
  users,
  reGetUsers,
  openEditModal,
  isAdminDashboard = false
}: {
  users: any;
  reGetUsers?: () => void;
  openEditModal?: (id: string) => void;
  isAdminDashboard?: boolean;

}) => {

  const handleLock = async (id: string) => {
    await toggleLocked(id)
    reGetUsers?.();
  }

  const columns: TableColumnsType<any> = !isAdminDashboard ? [
    { title: "Name", dataIndex: "", key: "name",      
      render: (row) => (
      <div className="flex gap-4">
        <p>{`${row.firstName} ${row.lastName}`}</p>
      </div>
    ) },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Created On",
      dataIndex: "",
      key: "createdAt",
      render: (row) => (
        <div className="flex gap-4">
          <p>{formatDate(row.createdAt)}</p>
        </div>
      ),
    },
    {
      title: 'Locked',
      dataIndex: '',
      key: 'locked',
      render: (row) => <div className='flex  gap-4'>
        <Checkbox checked={row.isLocked} onChange={() => handleLock(row._id)}>
        </Checkbox> 
      </div>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (row) => (
        <div className="flex gap-4">
          <button
            onClick={() => openEditModal?.(row._id)}
            className="border rounded-md px-3 py-1 cursor-pointer shadow-md hover:text-black"
          >
            edit
          </button>
        </div>
      ),
    },
  ]
  
  :
  
  [
    { title: "Name", dataIndex: "", key: "name",      
      render: (row) => (
      <div className="flex gap-4">
        <p>{`${row.firstName} ${row.lastName}`}</p>
      </div>
    ) },
    { title: "Email", dataIndex: "email", key: "email" },
  ];
  ;

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(row) => row._id}
    />
  );
};

export default Users;
