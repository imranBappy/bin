"use client";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Container, Image, Link, TextField, Button } from "@/common";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery } from "@apollo/client";
import Error from "@/common/Error";
import { useState } from "react";
import getThumbnail from "@/utils/getThumbnail";
import { PRODUCT_MUTATION } from "@/component/AdProduct/graphql/mutaton";
import { toast } from "react-hot-toast";
import PRODUCT_QUERY from "./graphql/query";


const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

export function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}
const MyAds = () => {
  const LIMIT = 10;
  const [searchStr, setSearchStr] = useState("");

  const { data, loading, error, fetchMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      first: LIMIT,
      offset: 0,
      search: searchStr,
      isSeller: true,
    },
  });
  const [updateProduct] = useMutation(PRODUCT_MUTATION, {
    onCompleted: (data) => {
      toast.success(data.productCreateUpdate.message);
      fetchMore({
        variables: {
          first: LIMIT,
          offset: 0,
          search: searchStr,
          isSeller: true,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  if (error) return <Error error={error} />;

  const totalCount = data?.products?.totalCount || 0;
  const products = data?.products?.edges || [];

  const handlePagination = (event, value) => {
    fetchMore({
      variables: {
        first: LIMIT,
        offset: (value - 1) * 10,
        search: searchStr,
      },
    });
  };

  const handleSearch = () => {
    fetchMore({
      variables: {
        first: LIMIT,
        offset: 0,
        search: searchStr,
      },
    });
  };

  const formatedData = products.map((product) => ({
    id: product.node.id,
    image: getThumbnail(product.node.images),
    name: product.node.name.split(" ").slice(0, 4).join(" ") + "...",
    category: product.node.category.name,
    stock: product.node.quantity,
    price: product.node.price,
    isActive: product.node.isActive,
  }));

  const togoleActive = (id) => {
    const product = products.find((product) => product?.node?.id === id);
    const rawSpecification = JSON.parse(product.node.rawSpecification || "{}");
    let specification = [];
    Object.keys(rawSpecification).forEach((key) => {
      specification.push({
        specificationCategory: key,
        name: rawSpecification[key],
      });
    });

    updateProduct({
      variables: {
        id: product?.node?.id,
        isActive: !product.node.isActive,
        category: product.node.category.id,
        condition: product.node.condition,
        description: product.node.description,
        district: product.node.district.id,
        division: product.node.division.id,
        images: product.node.images,
        quantity: product.node.quantity,
        name: product.node.name,
        price: product.node.price,
        specifications: specification,
      },
    });
  };
  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link href={`/en/dashboard/received-orders/${params.value}`} passHref>
            <Image
              src={params.value}
              width={40}
              height={40}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
              alt="laptop image"
            />
          </Link>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link href={`/en/dashboard/received-orders/${params.value}`} passHref>
            <strong
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {params.value}
            </strong>
          </Link>
        );
      },
    },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      renderCell: (params) => {
        return (
          <strong
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {params.value > 0 ? (
              <span style={{ color: "green" }}>{params.value}</span>
            ) : (
              <span style={{ color: "red" }}>{params.value}</span>
            )}
          </strong>
        );
      },
    },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    {
      field: "isActive",
      headerName: "Action",
      width: 200,
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
            <Link href={`/en/dashboard/post-ads/${params.id}`} passHref>
              <Button color="primary" variant="contained" size="small">
                Edit
              </Button>
            </Link>
            <Button
              color={params.value ? "success" : "error"}
              variant={params.value ? "outlined" : "contained"}
              onClick={() => togoleActive(params.id)}
              size="small"
              style={{ width: "110px" }}
            >
              {params.value ? "Activate" : "Deactivate"}
            </Button>
          </strong>
        );
      },
    },
  ];
  return (
    <Box my={8}>
      <Container maxWidth="lg">
        <Box
          sx={{
            height: 787,
            width: "100%",
            "& .MuiDataGrid-root": {
              backgroundColor: "background.paper",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <TextField
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search by ID, Date, Customare, Type, Item, Total, Status"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button onClick={handleSearch}>
              <strong>Filter</strong>
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            loading={loading}
            rows={formatedData}
            pagination
            pageSize={LIMIT}
            rowsPerPageOptions={[LIMIT]}
            rowCount={totalCount}
            onPageChange={handlePagination}
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
            autoPageSize
          />
        </Box>
      </Container>
    </Box>
  );
};
export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "en" } }, { params: { locale: "bn" } }],
    fallback: false,
  };
}
export default MyAds;
