"use client";
import { Button, TextField, Container, Box, Typography } from "@/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./graphql/mutation";
import { toast } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const validationSchema = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
0;

const Login = ({ params: { locale } }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginReq({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    },
  });

  const router = useRouter();
  const { login } = useAuth();

  const [loginReq, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      toast.success("Login Success");
      login(data.adminLogin);
      router.push(`/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
        pb={12}
      >
        <Box mb={20}>
          <Typography variant="h6" my={2}>
            Account Login
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              variant="contained"
              fullWidth={true}
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: "en" } }, { params: { locale: "bn" } }],
    fallback: false,
  };
}

export default Login;
