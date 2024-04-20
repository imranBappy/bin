"use client";
import { useQuery } from "@apollo/client";
import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { REPORTS_QUERY } from "./graphql/query";
import { DataGrid } from "@/common";

const ReportsTable = () => {
  const pageSize = 13;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery(REPORTS_QUERY, {
    variables: {
      first: pageSize,
      offset: offset,
    },
  });
  const total = data?.productReports?.totalCount;

  const fetchMoreData = (page) => {
    const newOffset = pageSize * page;
    setOffset(newOffset);
  };

  return (
    <Card
      sx={{
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Box>
        <DataGrid
          rows={
            data?.productReports?.edges?.map((edge, i) => ({
              id: edge.node.id,
              createdAt: new Date(edge.node.createdAt).toLocaleDateString(),
              productName: edge.node.product.name,
              productId: edge.node.product.id,
              details: edge.node.details,
              reportType: edge.node.reportType.title,
              index: i + 1,
            })) || []
          }
          columns={[
            {
              field: "index",
              headerName: "Index",
              width: 150,
            },
            { field: "id", headerName: "ID", width: 90 },
            {
              field: "productId",
              headerName: "Product Id",
            },
            {
              field: "productName",
              headerName: "Product Name",
              width: 150,
            },
            {
              field: "details",
              headerName: "Details",
              width: 300,
            },
            {
              field: "createdAt",
              headerName: "CreatedAt",
              minWidth: 80,
            },
            {
              field: "reportType",
              headerName: "Report Type",
              minWidth: 120,
            },
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
      </Box>
    </Card>
  );
};

export default ReportsTable;
