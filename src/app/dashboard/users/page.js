"use client";
import { DataGrid } from "@/common";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Box, Card, IconButton } from "@mui/material";
import { Container, Image, Link, TextField, Button } from "@/common";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "./graphql/query";
import images from "@/assets/images";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import Verified from "@/component/common/Verified";

const columns = [
  {
    field: "image",
    headerName: "Image",
    minWidth: 80,
    renderCell: (params) => {
      return (
        <Link href={`/dashboard/users/${params.row.node.id}`} passHref>
          <Image
            src={params.row?.node?.profilePic || images.UPLOAD_PLACEHOLDER}
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
    minWidth: 150,
    renderCell: (params) => {
      return (
        <Link href={`/dashboard/users/${params.row.node.id}`} passHref>
          <strong
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {params.row.node.name || "N/A"}
          </strong>
        </Link>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 150,
    renderCell: (params) => {
      return (
        <strong
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {params.row.node.phone || "N/A"}
        </strong>
      );
    },
  },
  {
    field: "Is Active",
    headerName: "Is Active",
    minWidth: 100,
    renderCell: (params) => {
      return (
        <strong
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {params.row.node.isActive ? "Active" : "Inactive"}
        </strong>
      );
    },
  },
  {
    field: "sellerStatus",
    headerName: "Seller Status",
    minWidth: 100,
    renderCell: (params) => {
      return (
        <strong
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {params.row.node.sellerStatus === "verified-seller" ? (
            <Verified />
          ) : (
            <IconButton>
              <UnpublishedIcon />
            </IconButton>
          )}
        </strong>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    minWidth: 100,
    renderCell: (params) => {
      return (
        <strong
          style={{
            // minWidth: "250px",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {params.row.node.email}
        </strong>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
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
            Edit
          </button>
        </strong>
      );
    },
  },
];

const Users = () => {
  const pageSize = 15;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("all");
  const [verification, setVerification] = useState("all");
  const [email, setEmail] = useState("");

  const { data, loading, refetch } = useQuery(USERS_QUERY, {
    variables: {
      first: pageSize,
      isActive: status === "all" ? null : status === "active",
      sellerStatus: verification === "all" ? null : verification,
      email: email || null,
      offset: offset,
    },
  });
  const fetchMoreData = (page) => {
    const newOffset = pageSize * page;
    setOffset(newOffset);
  };
  const handleFilter = () => {
    refetch({
      variables: {
        first: pageSize,
        isActive: status === "all" ? null : status === "active",
        sellerStatus: verification === "all" ? null : verification,
        email: email || null,
        offset: offset,
      },
    });
  };
  const totalCount = data?.users.totalCount || 0;
  return (
    <Box my={8}>
      <Container maxWidth="lg">
        <Card
          sx={{
            padding: "20px",
            borderRadius: "10px",
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
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Search by Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
              width={300}
            >
              <FormControl fullWidth>
                <InputLabel id="status-select">Status</InputLabel>
                <Select
                  id="status-select"
                  label="Status"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="verification-select">Verification</InputLabel>
                <Select
                  id="verification-select"
                  label="Verification"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) => setVerification(e.target.value)}
                  value={verification}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"verified-seller"}>Verified</MenuItem>
                  <MenuItem value={"unverified-seller"}>Un Verified</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button onClick={handleFilter} disabled={loading}>
              <strong>Filter</strong>
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={data?.users?.edges || []}
            getRowId={(row) => row.node.id}
            loading={loading}
            rowCount={totalCount}
            onPaginationModelChange={({ page, pageSize }) => {
              fetchMoreData(page, pageSize);
              setPage(page);
            }}
            paginationModel={{
              pageSize: pageSize,
              page: page,
            }}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default Users;
