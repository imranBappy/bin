"use client";
import { Grid } from "@mui/material";
import { OverviewSales } from "@/sections/overview/overview-sales";
import { OverviewTraffic } from "@/sections/overview/overview-traffic";
import { OverviewLatestProducts } from "@/sections/overview/overview-latest-products";
import { OverviewLatestOrders } from "@/sections/overview/overview-latest-orders";
import { subDays, subHours } from "date-fns";
import { OverviewCard } from "@/sections/overview/OverviewCard";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Product from "@mui/icons-material/Category";
import { useQuery } from "@apollo/client";
import {
  DASHBOARD_QUERY,
  SELLER_DASHBOARD_QUERY,
} from "@/app/dashboard/graphql/query";
import Loader from "@/common/Loader";
import Error from "@/common/Error";

const now = new Date();

const AdminDashboard = () => {
  const { data, loading, error } = useQuery(SELLER_DASHBOARD_QUERY);

  const {
    order_report_by_year,
    total_cancelled_orders,
    total_customers,
    total_orders,
    total_products,
    total_sales,
    total_succeed_orders,
  } = data?.salesDashboard || {};

  if (loading) return <Loader />;
  if (error) return <Error error={error} />;

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
          value={total_customers}
          backgroundColor="primary.main"
        />
      </Grid>
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
          title="Total Products"
          Icon={UsersIcon}
          difference={16}
          positive={false}
          value={total_products}
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
          value={total_orders}
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
          value={total_succeed_orders}
          backgroundColor="success.main"
        />
      </Grid>

      <Grid xs={12} lg={12} pr={3} pb={3}>
        <OverviewSales
          chartSeries={[
            {
              name: "This year",
              data: order_report_by_year || [],
            },
            // {
            //   name: "Last year",
            //   data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            // },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>

      <Grid xs={12} md={12} lg={12}>
        <OverviewLatestProducts
          products={data?.products?.edges || []}
          sx={{}}
        />
      </Grid>
      
    </Grid>
  );
};

export default AdminDashboard;
