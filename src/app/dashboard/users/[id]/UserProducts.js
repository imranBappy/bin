"use client";
import { Box, DataGrid } from "@/common";
const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "brand", headerName: "Brand", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  { field: "price", headerName: "Price", type: "number", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      return (
        <strong
          style={{
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: params.value === "Pending" ? "orange" : "green",
            width: "100%",
            textAlign: "center",
          }}
        >
          {params.value}
        </strong>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <strong
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View
          </button>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </strong>
      );
    },
  },
];
const generateLaptopData = () => {
  const data = [];

  for (let i = 1; i <= 209; i++) {
    data.push({
      id: i,
      date: new Date().toISOString(),
      brand: `Brand ${i}`,
      model: `Model ${i}`,
      price: Math.floor(Math.random() * 1000) + 500, // Example random price between 500 and 1500
      status: i % 2 === 0 ? "Pending" : "Delivered",
    });
  }

  return data;
};

const UserProducts = () => {
  const rows = generateLaptopData();
  return (
    <Box
      sx={{
        height: 800,
        width: "100%",
      }}
    >
      <DataGrid
        columns={columns}
        pageSize={10}
        rows={rows}
        autoPageSize={true}
      />
    </Box>
  );
};

export default UserProducts;
