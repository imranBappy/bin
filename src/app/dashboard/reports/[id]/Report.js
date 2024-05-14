"use client";
import { useQuery } from "@apollo/client";
import Loader from "@/common/Loader";
import { REPORT_QUERY } from "../graphql/query";
import { Box, Card, Typography } from "@mui/material";
import { Button, Link } from "@/common";
import moment from "moment";

const Report = ({ params }) => {
  const { data, loading } = useQuery(REPORT_QUERY, {
    variables: {
      id: params.id,
    },
  });
  if (loading) {
    return <Loader />;
  }
  const { createdAt, details, product } = data?.productReport;
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h3" component={"h3"} mb={2}>
          Report Details
        </Typography>
        <Link
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_SITE_LINK}/en/product/${product.id}`}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: 22,
            }}
          >
            {product?.name}
          </Typography>
        </Link>
        <Typography variant="bodyNormal" color={"text.secondary"}>
          Reported on {moment(createdAt).fromNow()}
        </Typography>

        <Typography
          variant="bodyNormal"
          color={"text.secondary"}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            marginTop: "10px",
          }}
        >
          {details}
        </Typography>

        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_LINK}/en/product/${product.id}`}
          target="_blank"
        >
          <Button
            variant="outlined"
            style={{ width: "310px", marginTop: "20px" }}
          >
            View Product Details
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default Report;
