"use client";

import { useEffect, useState } from "react";
import { Button, TextField } from "@/common";
import { useLazyQuery, useMutation } from "@apollo/client";
import { OPTION_MUTATION } from "../graphql/mutation";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { OPTION_QUERY, SPECIFICATIONS_QUERY } from "../graphql/query";
import Loader from "@/common/Loader";

const CuOption = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const searchQuery = useSearchParams();
  const router = useRouter();

  const [createCategory, { loading: createCategoryLoading }] = useMutation(
    OPTION_MUTATION,
    {
      onCompleted: (data) => {
        toast.success(data.specificationCreateUpdate.message);
        setName("");
        if ("Updated successfully.") {
          router.push("/dashboard/options");
        }
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error adding category");
      },
    }
  );
  const [getCategory, { loading: getCategoryLoading }] = useLazyQuery(
    OPTION_QUERY,
    {
      variables: { id: searchQuery.get("id") },
      onCompleted: (data) => {
        const option = data?.specification;
        console.log(option);
        if (!option?.id) {
          toast.error("Option not found");
        }
        setName(option?.name);
      },
      onError: (error) => {
        toast.error("Error fetching category");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
    }
    setError("");
    const catId = searchQuery.get("id");
    if (catId) {
      createCategory({
        variables: {
          input: {
            id: catId,
            name: name,
          },
        },
      });

      return;
    }

    createCategory({
      variables: {
        input: {
          name: name,
        },
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

  if (getCategoryLoading) return <Loader />;
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
        label="Option"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={Boolean(error)}
        helperText={error}
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

export default CuOption;
