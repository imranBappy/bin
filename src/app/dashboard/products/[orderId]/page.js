"use client";

import { Container, Box, Typography, Grid, Button, Image } from "@/common";
import { AddToCartContext } from "@/wrapper/Wrapper";
import { useContext, useEffect } from "react";
import Shop from "@/assets/images/shop1.png";
import product from "@/assets/images/product100.png";

const OrderDetailsPage = () => {
  const [rows, setCart] = useContext(AddToCartContext);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, [setCart]);
  return (
    <Box my={8}>
      <Container maxWidth="lg">
        <Box boxShadow={3} p={4}>
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            Order Information #139185
          </Typography>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Order Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Order ID: 139185
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: 2021-10-01
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: Delivered
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Name: John Doe
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: 123-456-7890
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: 1234 Main St, Springfield, IL 62701
              </Typography>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="h6" gutterBottom py={2}>
              Order Details
            </Typography>

            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    borderRadius: "5px",
                    backgroundColor: "background.paper",
                  }}
                >
                  <Image
                    src={Shop}
                    alt={"Shop Banner"}
                    width={60}
                    height={60}
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #000",
                    }}
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    color={"text.primary"}
                    fontSize={17}
                  >
                    Masala House For Flash Sale COD
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      py: 2,
                      px: 1,
                      borderRadius: "5px",
                    }}
                  >
                    <Image
                      src={product}
                      alt={"Shop Banner"}
                      width={70}
                      height={70}
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #000",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        color={"text.primary"}
                        fontSize={17}
                        fontWeight={500}
                      >
                        Masala House For Flash Sale COD
                      </Typography>
                      <Typography>Status : Delivered</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      marginTop: 2,
                      marginRight: 1,
                    }}
                  >
                    <Typography>Price : ৳ 100</Typography>
                    <Typography>Quantity : 10</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderDetailsPage;
