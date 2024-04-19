"use client";
import { useQuery } from "@apollo/client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { SPECIFICATIONS_QUERY } from "./graphql/query";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Link } from "@/common";

const OptionsTable = () => {
  const PASE_SIZE = 10;
  const { data, loading, fetchMore } = useQuery(SPECIFICATIONS_QUERY, {
    variables: {
      first: PASE_SIZE,
      offset: 0,
    },
  });
  const total = data?.specifications?.totalCount;

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

export default OptionsTable;
