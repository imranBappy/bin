import React from "react";
import { Grid } from "@mui/material";
import { OverviewSales } from "@/sections/overview/overview-sales";
import { OverviewTraffic } from "@/sections/overview/overview-traffic";
import { OverviewLatestProducts } from "@/sections/overview/overview-latest-products";
import { OverviewLatestOrders } from "@/sections/overview/overview-latest-orders";
import { subDays, subHours } from "date-fns";
import { OverviewCard } from "@/sections/overview/OverviewCard";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Product from "@mui/icons-material/Category";

const now = new Date();

const SellerDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid
        xs={12}
        sm={6}
        lg={3}
        py={5}
        pr={{
          md: 0,
          lg: 3,
        }}
      >
        <OverviewCard
          title="Total Customers"
          Icon={UsersIcon}
          difference={16}
          positive={false}
          value="1.6k"
          backgroundColor="primary.main"
        />
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={3}
        py={5}
        pr={{
          sx: 0,
          sm: 3,
          md: 3,
          lg: 3,
        }}
      >
        <OverviewCard
          title="Total Orders"
          Icon={Product}
          difference={50}
          positive={true}
          value="100"
        />
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={3}
        py={5}
        pr={{
          sx: 0,
          sm: 3,
          md: 3,

          lg: 3,
        }}
      >
        <OverviewCard
          title="Succeed Orders"
          Icon={Product}
          difference={75}
          positive={true}
          value="75"
          backgroundColor="success.main"
        />
      </Grid>
      <Grid xs={12} sm={6} lg={3} py={5}>
        <OverviewCard
          title="Canceled Orders"
          Icon={Product}
          difference={15}
          positive={false}
          value="15"
          backgroundColor="error.main"
        />
      </Grid>
      <Grid xs={12} lg={8} pr={3} pb={3}>
        <OverviewSales
          chartSeries={[
            {
              name: "This year",
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
            },
            {
              name: "Last year",
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} pb={3}>
        <OverviewTraffic
          chartSeries={[63, 15, 22]}
          labels={["Desktop", "Tablet", "Phone"]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4}>
        <OverviewLatestProducts
          products={[
            {
              id: "5ece2c077e39da27658aa8a9",
              image: "/assets/products/product-1.png",
              name: "Healthcare Erbology",
              updatedAt: subHours(now, 6).getTime(),
            },
            {
              id: "5ece2c0d16f70bff2cf86cd8",
              image: "/assets/products/product-2.png",
              name: "Makeup Lancome Rouge",
              updatedAt: subDays(subHours(now, 8), 2).getTime(),
            },
            {
              id: "b393ce1b09c1254c3a92c827",
              image: "/assets/products/product-5.png",
              name: "Skincare Soja CO",
              updatedAt: subDays(subHours(now, 1), 1).getTime(),
            },
            {
              id: "a6ede15670da63f49f752c89",
              image: "/assets/products/product-6.png",
              name: "Makeup Lipstick",
              updatedAt: subDays(subHours(now, 3), 3).getTime(),
            },
            {
              id: "bcad5524fe3a2f8f8620ceda",
              image: "/assets/products/product-7.png",
              name: "Healthcare Ritual",
              updatedAt: subDays(subHours(now, 5), 6).getTime(),
            },
          ]}
          sx={{}}
        />
      </Grid>
      <Grid pl={3} xs={12} md={12} lg={8} sx={{}}>
        <OverviewLatestOrders
          sx={{ height: 500 }}
          orders={[
            {
              id: "f69f88012978187a6c12897f",
              ref: "DEV1049",
              amount: 30.5,
              customer: {
                name: "Ekaterina Tankova",
              },
              createdAt: 1555016400000,
              status: "pending",
            },
            {
              id: "9eaa1c7dd4433f413c308ce2",
              ref: "DEV1048",
              amount: 25.1,
              customer: {
                name: "Cao Yu",
              },
              createdAt: 1555016400000,
              status: "delivered",
            },
            {
              id: "01a5230c811bd04996ce7c13",
              ref: "DEV1047",
              amount: 10.99,
              customer: {
                name: "Alexa Richardson",
              },
              createdAt: 1554930000000,
              status: "refunded",
            },
            {
              id: "1f4e1bd0a87cea23cdb83d18",
              ref: "DEV1046",
              amount: 96.43,
              customer: {
                name: "Anje Keizer",
              },
              createdAt: 1554757200000,
              status: "pending",
            },
            {
              id: "9f974f239d29ede969367103",
              ref: "DEV1045",
              amount: 32.54,
              customer: {
                name: "Clarke Gillebert",
              },
              createdAt: 1554670800000,
              status: "delivered",
            },
            {
              id: "ffc83c1560ec2f66a1c05596",
              ref: "DEV1044",
              amount: 16.76,
              customer: {
                name: "Adam Denisov",
              },
              createdAt: 1554670800000,
              status: "delivered",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default SellerDashboard;
