"use client";
import { useQuery } from "@apollo/client";
import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { SPECIFICATIONS_QUERY } from "./graphql/query";
import { Button, Link, DataGrid } from "@/common";

const OptionsTable = () => {
  const pageSize = 13;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery(SPECIFICATIONS_QUERY, {
    variables: {
      first: pageSize,
      offset: offset,
    },
  });
  const total = data?.specifications?.totalCount;

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
            data?.specifications?.edges?.map((edge, i) => ({
              id: edge.node.id,
              name: edge.node.name,
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
            { field: "name", headerName: "Name", width: 150 },
            {
              field: "action",
              headerName: "Action",
              width: 150,
              renderCell: (params) => (
                <Link href={`/dashboard/options/add?id=${params.row.id}`}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      console.log(params.row.id);
                    }}
                  >
                    Edit
                  </Button>
                </Link>
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

export default OptionsTable;
