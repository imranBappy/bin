"use client";
import { useQuery } from "@apollo/client";
import { Box, Card } from "@mui/material";
import React from "react";
import { SPECIFICATIONS_CATEGORIES_QUERY } from "./graphql/query";
import { DataGrid } from "@mui/x-data-grid";
import images from "@/assets/images";
import { Button, Link } from "@/common";

const SpecificationsTable = () => {
  const PASE_SIZE = 10;
  const { data, loading, fetchMore } = useQuery(
    SPECIFICATIONS_CATEGORIES_QUERY,
    {
      variables: {
        first: PASE_SIZE,
        offset: 0,
      },
    }
  );
  const total = data?.specificationCategories?.totalCount;

  const handlePageChange = (page) => {
    fetchMore({
      variables: {
        first: PASE_SIZE,
        offset: page * PASE_SIZE,
      },
    });
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
            data?.specificationCategories?.edges?.map((edge, i) => ({
              id: edge.node.id,
              name: edge.node.name,
              index: i + 1,
              createdAt: edge.node.createdAt,
              options: edge.node.options,
              category: edge.node.category,
            })) || []
          }
          columns={[
            {
              field: "index",
              headerName: "Index",
              width: 150,
            },
            { field: "id", headerName: "ID", width: 90 },
            { field: "name", headerName: "Name", width: 150 },
            {
              field: "optionsLength",
              headerName: "Options",
              width: 150,
              valueGetter: (params) => params.row?.options?.totalCount || 0,
            },
            {
              field: "createdAt",
              headerName: "Created At",
              width: 150,
              valueGetter: (params) =>
                new Date(params.row.createdAt).toLocaleDateString(),
            },
            {
              field: "category",
              headerName: "Category",
              width: 150,
              valueGetter: (params) => params.row.category?.name || "-",
            },
            {
              field: "image",
              headerName: "Image",
              width: 150,
              renderCell: (params) => (
                <img
                  src={params.row?.category?.image || images.UPLOAD_PLACEHOLDER}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    padding: "3px",
                  }}
                />
              ),
            },
            {
              field: "action",
              headerName: "Action",
              width: 210,
              renderCell: (params) => (
                <Box>
                  <Link
                    href={`/dashboard/specification/add?id=${params.row.id}`}
                    underline="none"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: "10px" }}
                      size="small"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button color="error" variant="outlined" size="small">
                    Delete
                  </Button>
                </Box>
              ),
            },
          ]}
          pageSize={PASE_SIZE}
          rowCount={total}
          pagination
          onPageChange={(page) => handlePageChange(page.page)}
          loading={loading}
          autoHeight
        />
      </Box>
    </Card>
  );
};

export default SpecificationsTable;
