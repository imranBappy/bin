"use client";

import { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@/common";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SPECIFICATION_CATEGORORY_MUTATION } from "../graphql/mutation";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SPECIFICATIONS_CATEGORIES_QUERY,
  SPECIFICATIONS_CATEGORY_QUERY,
} from "../graphql/query";
import Loader from "@/common/Loader";

const CuSpecification = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState({
    value: "",
    label: "",
  });
  const [option, setOption] = useState([]);
  const [error, setError] = useState({});
  const searchQuery = useSearchParams();
  const router = useRouter();

  const [createCategory, { loading: createCategoryLoading }] = useMutation(
    SPECIFICATION_CATEGORORY_MUTATION,
    {
      onCompleted: (data) => {
        toast.success(data.specificationCategoryCreateUpdate.message);
        if ("Updated successfully.") {
          router.push("/dashboard/specification");
        }
        // clear state
        setName("");
        setCategory({
          value: "",
          label: "",
        });
        setOption([]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error adding category");
      },
    }
  );
  const [getCategory, { loading: getCategoryLoading }] = useLazyQuery(
    SPECIFICATIONS_CATEGORIES_QUERY,
    {
      variables: { id: searchQuery.get("id") },
      onCompleted: (data) => {
        const specificationCategories = data?.specificationCategories?.edges;
        if (category?.length === 0) {
          toast.error("Category not found");
          return;
        }
        setName(specificationCategories[0]?.node?.name);
        setCategory({
          value: specificationCategories[0]?.node?.category?.id,
          label: specificationCategories[0]?.node?.category?.name,
        });

        setOption(
          specificationCategories[0]?.node?.options?.edges.map((opt) => ({
            value: opt.node.id,
            label: opt.node.name,
          })) || []
        );
      },
      onError: (error) => {
        toast.error("Error fetching category");
      },
    }
  );

  const { data: specificationData, loading: specificationLoading } = useQuery(
    SPECIFICATIONS_CATEGORY_QUERY
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setError("");
    const catId = searchQuery.get("id");

    if (!name) {
      setError({
        ...error,
        name: "Name is required",
      });
      return;
    }

    if (!category.value) {
      setError({
        ...error,
        category: "Category is required",
      });
      return;
    }

    if (option.length === 0) {
      setError({
        ...error,
        options: "Options are required",
      });
      return;
    }

    if (catId) {
      createCategory({
        variables: {
          id: catId,
          name: name,
          userCanAdd: true,
          options: option.map((opt) => opt.value),
          category: category.value,
        },
      });

      return;
    }

    createCategory({
      variables: {
        name: name,
        userCanAdd: true,
        options: option.map((opt) => opt.value),
        category: category.value,
      },
    });
  };

  useEffect(() => {
    const catId = searchQuery.get("id");
    if (catId) {
      getCategory({
        variables: { id: catId },
      });
    }
  }, []);

  const options = specificationData?.specifications?.edges?.map((edge) => ({
    value: edge.node.id,
    label: edge.node.name,
  }));

  const categories = specificationData?.category?.subCategories?.edges?.map(
    (edge) => ({
      value: edge.node.id,
      label: edge.node.name,
    })
  );

  if (getCategoryLoading || specificationLoading) return <Loader />;
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        gap: "20px",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Specification  Name"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError({
            ...error,
            name: "",
          });
        }}
        error={Boolean(error?.name)}
        helperText={error?.name}
      />

      <Autocomplete
        options={categories || []}
        value={category}
        onChange={(e, v) => {
          setCategory(v);
          setError({
            ...error,
            category: "",
          });
        }}
        id="category"
        label="Category"
        error={Boolean(error?.category)}
        helperText={error?.category}
        multiple={false}
      />

      <Autocomplete
        options={options || []}
        value={option}
        onChange={(e, v) => {
          setOption(v);
          setError({
            ...error,
            options: "",
          });
        }}
        id="options"
        label="options"
        error={Boolean(error?.options)}
        helperText={error?.options}
        multiple={true}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={createCategoryLoading}
      >
        Add Option
      </Button>
    </form>
  );
};

export default CuSpecification;
