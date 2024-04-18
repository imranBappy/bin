"use client";

import { Container, Box } from "@/common";
import CategoryCard from "./CategoryCard";
import ComputerIcon from "@mui/icons-material/Computer";
import { CATEGORY_QUERY } from "./graphql/query";
import { useQuery } from "@apollo/client";
import Loader from "@/common/Loader";
import Error from "@/common/Error";

const Categories = () => {
  const { data, loading, error } = useQuery(CATEGORY_QUERY);
  const categories = data?.category?.subCategories?.edges || [];

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Container maxWidth={"xl"}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={{
          xs: 2,
          md: 4,
        }}
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        {categories.map((category) => {
          return (
            <CategoryCard
              id={category.node.id}
              key={category.node.id}
              title={category.node.name}
              image={category.node.image}
              numberOfProducts={category.node.products.totalCount}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Categories;
