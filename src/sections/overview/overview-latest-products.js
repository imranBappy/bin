import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import images from "@/assets/images";
import getThumbnail from "@/utils/getThumbnail";
import Link from "next/link";

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products.map((item, index) => {
          const hasDivider = index < products.length - 1;

          const productName = item.node.name.split(" ").slice(0, 10).join(" ");
          const product = {
            id: item.node.id,
            name: `${productName}...`,
            image: getThumbnail(item.node.images) || images.UPLOAD_PLACEHOLDER,
            updatedAt: item.node.createdAt,
          };
          const ago = formatDistanceToNow(product.updatedAt);

          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemAvatar>
                {product.image ? (
                  <Box
                    component="img"
                    src={product.image}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
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
            href={`/dashboard/products`}
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

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
