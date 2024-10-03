"use client";
import React from "react";
import { Checkbox, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { deleteCategory, toggleActive } from "@/lib/actions/category.action";
import { formatDate } from "@/utils/common";

interface DataType {
  _id: string;
  title: string;
  slug: number;
  inActive: boolean;
  createdAt: any;
}

const Categories = ({
  categories,
  reGetCategories,
  openEditModal,
  isAdminDashboard = false
}: {
  categories: any;
  reGetCategories?: () => void;
  openEditModal?: (id: string) => void;
  isAdminDashboard?: boolean
}) => {
  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    reGetCategories?.();
  };

  const handleActive = async (id: string) => {
    await toggleActive(id);
    reGetCategories?.();
  }

  const columns: TableColumnsType<DataType> = !isAdminDashboard ? [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div className="flex gap-4">
          <p>{formatDate(createdAt)}</p>
        </div>
      ),
    },
    {
      title: 'Disabled?',
      dataIndex: '',
      key: 'inActive',
      render: (row) => <div className='flex gap-4'>
        <Checkbox checked={row.inActive} onChange={() => handleActive(row._id)}>
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
          <Popconfirm
            title="Delete the Category"
            description="Are you sure to delete this Category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(row._id)}
          >
            <p className="bg-red-500 rounded-md px-3 py-1 text-white cursor-pointer shadow-md">
              delete
            </p>
          </Popconfirm>
        </div>
      ),
    },
  ]
  :
  [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div className="flex gap-4">
          <p>{formatDate(createdAt)}</p>
        </div>
      ),
    },
  ]
  ;

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey={(row) => row._id}
    />
  );
};

export default Categories;
