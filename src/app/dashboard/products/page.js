"use client";
import { DataGrid } from "@/common";
import { Box, Card } from "@mui/material";
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

const MyAds = () => {
  const pageSize = 15;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  const { data, loading, error, fetchMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      first: pageSize,
      offset: offset,
      search: searchStr,
    },
  });
  const [updateProduct] = useMutation(PRODUCT_MUTATION, {
    onCompleted: (data) => {
      toast.success(data.productCreateUpdate.message);
      fetchMore({
        variables: {
          first: pageSize,
          offset: 0,
          search: searchStr,
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

  const fetchMoreData = (page) => {
    const newOffset = pageSize * page;
    setOffset(newOffset);
  };
  const handleSearch = () => {
    fetchMore({
      variables: {
        first: pageSize,
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
      minWidth: 50,
    },
    {
      field: "name",
      headerName: "Name",
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
      minWidth: 200,
    },
    { field: "category", headerName: "Category" },
    {
      field: "stock",
      headerName: "Stock",
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
    { field: "price", headerName: "Price", type: "number" },
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
        <Card
          sx={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
            rows={formatedData}
            rowCount={totalCount}
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
        </Card>
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
