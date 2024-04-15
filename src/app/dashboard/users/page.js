"use client";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Box, IconButton } from "@mui/material";
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
    flex: 1,
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
    flex: 1,
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
          {params.row.node.phone || "N/A"}
        </strong>
      );
    },
  },
  {
    field: "Is Active",
    headerName: "Is Active",
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
          {params.row.node.isActive ? "Active" : "Inactive"}
        </strong>
      );
    },
  },
  {
    field: "sellerStatus",
    headerName: "Seller Status",
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
    flex: 2,
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

function CustomNoRowsOverlay() {
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
const Users = () => {
  const [status, setStatus] = useState("all");
  const [verification, setVerification] = useState("all");
  const [email, setEmail] = useState("");
  const LIMIT = 10;
  const { data, loading, error, refetch, fetchMore } = useQuery(USERS_QUERY, {
    variables: {
      first: LIMIT,
      isActive: status === "all" ? null : status === "active",
      sellerStatus: verification === "all" ? null : verification,
      email: email || null,
    },
  });

  const handleFilter = () => {
    refetch({
      variables: {
        first: LIMIT,
        isActive: status === "all" ? null : status === "active",
        sellerStatus: verification === "all" ? null : verification,
        email: email || null,
      },
    });
  };

  const handlePagination = (event, value) => {
    fetchMore({
      variables: {
        first: LIMIT,
        offset: (value - 1) * LIMIT,
        search: searchStr,
      },
    });
  };
  const totalCount = data?.users.totalCount || 0;
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
                  <MenuItem value={"non-verified-Seller"}>Un Verified</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button onClick={handleFilter} disabled={loading}>
              <strong>Filter</strong>
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            pageSize={LIMIT}
            loading={loading}
            rows={data?.users?.edges || []}
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
            getRowId={(row) => row.node.id}
            pagination
            rowCount={Math.floor(totalCount / LIMIT)}
            onPageChange={handlePagination}
            disableRowSelectionOnClick={true}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Users;
