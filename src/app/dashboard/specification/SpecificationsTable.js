"use client";
import { useQuery } from "@apollo/client";
import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { SPECIFICATIONS_CATEGORIES_QUERY } from "./graphql/query";
import images from "@/assets/images";
import { Button, Link, DataGrid, Autocomplete } from "@/common";
import { CATEGORY_QUERY } from "../categories/graphql/query";

const SpecificationsTable = () => {
  const pageSize = 13;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState(null);
  const { data, loading } = useQuery(SPECIFICATIONS_CATEGORIES_QUERY, {
    variables: {
      first: pageSize,
      offset: offset,
      category: category?.id || null,
    },
  });

  const { data: categoryData } = useQuery(CATEGORY_QUERY);

  const categories = categoryData?.category?.subCategories?.edges?.map(
    (edge) => ({
      id: edge.node.id,
      label: edge.node.name,
    })
  );

  const total = data?.specificationCategories?.totalCount;
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          pb={2}
        >
          <Autocomplete
            id="category"
            name="category"
            options={categories || []}
            getOptionLabel={(option) => option.label}
            onChange={(e, newValue) => {
              setCategory(newValue || null);
            }}
            value={category}
            label={"Category filter"}
            placeholder="Category"
            style={{ width: "400px" }}
          />
        </Box>

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

export default SpecificationsTable;
