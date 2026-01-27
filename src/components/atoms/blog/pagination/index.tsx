"use client"
import { Pagination } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PostsPagination = ({totalCount} : {totalCount: number}) => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const router = useRouter();
    
    const searchParams = useSearchParams();
    const pathName = usePathname();

    useEffect(() => {

      if (searchParams?.size > 0) {

        const page = parseInt(searchParams.get('page') as string)
        const pageSize = parseInt(searchParams.get('pageSize') as string) 

        setPage(page);
        setPageSize(pageSize)

      }
    }, [searchParams])

    const handlePageChange = (page: number, pageSize: number) => {
        router.push(`${pathName}?page=${page}&pageSize=${pageSize}`)
    }

    const handleSizeChange = (current: number, size: number) => {
        router.push(`${pathName}?page=${current}&pageSize=${size}`)
    }

  return (
    <Pagination
        showSizeChanger
        onShowSizeChange={handleSizeChange}
        defaultCurrent={page}
        onChange={handlePageChange}
        total={totalCount}
    />
  )
}

export default PostsPagination