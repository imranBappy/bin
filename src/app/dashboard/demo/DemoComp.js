"use client";

import { DataGrid } from "@/common";
import { useQuery } from "@apollo/client";
import PRODUCT_QUERY from "../products/graphql/query";
import { useState } from "react";
import Error from "@/common/Error";

export default function DemoComp() {
  const pageSize = 10;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const {
    loading,
    error,
    data: queryData,
    fetchMore,
  } = useQuery(PRODUCT_QUERY, {
    variables: {
      first: pageSize,
      offset: offset,
    },
  });
  const products =
    queryData?.products?.edges?.map((edge, i) => ({
      ...edge.node,
      index: i + 1,
    })) || [];
  const total = queryData?.products?.totalCount || 0;

  const fetchMoreData = (page) => {
    const newOffset = pageSize * page;
    setOffset(newOffset);
  };

  if (error) return <Error />;

  return (
    <DataGrid
      rows={products}
      columns={[
        { field: "index", headerName: "Index", width: 90 },
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "price", headerName: "Price", width: 110 },
        { field: "quantity", headerName: "Quantity", width: 110 },
        { field: "condition", headerName: "Condition", width: 150 },
        { field: "isActive", headerName: "Active", width: 110 },
      ]}
      rowCount={total}
      loading={loading}
      paginationModel={{
        pageSize: pageSize,
        page: page,
      }}
      onPaginationModelChange={({ page, pageSize }) => {
        fetchMoreData(page, pageSize);
        setPage(page);
      }}
    />
  );
}
