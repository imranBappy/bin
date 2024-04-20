import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "@/component/Scrollbar/Scrollbar";
import Link from "next/link";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => {
                const order = item.node;
                const createdAt = format(order.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.fullName}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          <Link
            href={`/dashboard/orders`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            passHref={true}
          >
            View all
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
