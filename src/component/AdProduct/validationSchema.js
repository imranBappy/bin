import * as Yup from "yup";

const laptopValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  brand: Yup.string().required("Brand is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),
});
export { laptopValidationSchema };
