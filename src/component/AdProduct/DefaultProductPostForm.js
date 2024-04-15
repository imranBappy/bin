"use client";
import {
  Button,
  Box,
  Typography,
  Grid,
  Autocomplete,
  IconButton,
  Image,
} from "@/common";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { bangladeshDistricts } from "@/data/location";
import getUpazilas from "@/utils/getUpazilas";
import Images from "@/assets/images";
const categoryOptions = [
  {
    id: "1",
    label: "Laptop",
    value: "laptop",
  },
  {
    id: "2",
    label: "Computer",
    value: "computer",
  },
  {
    id: "3",
    label: "Phone",
    value: "phone",
  },
];

const DefaultProductPostForm = ({
  formik,
  selectedFiles,
  handleFileSelect,
  handleRemoveFile,
  fileError,
  fileCountLimit,
  productCategoryState,
}) => {
  const [productCategory, setProductCategory] = productCategoryState;

  return (
    <Grid item xs={12} sm={4}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="space-between"
          >
            {/* <FormLabel>
              <Typography variant="h6">Choose Category</Typography>
            </FormLabel> */}

            <Autocomplete
              id="category"
              name="category"
              label={"Category"}
              options={categoryOptions}
              onChange={(e, newValue) => setProductCategory(newValue?.label)}
              value={productCategory}
              error={false}
              helperText={""}
              sx={{ mb: "1rem" }}
            />
          </Box>

          <Box>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <Typography variant="h6">Condition</Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Used"
                  control={<Radio />}
                  label="Used"
                />
                <FormControlLabel value="New" control={<Radio />} label="New" />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* Location */}
          <Box>
            <FormLabel>
              <Typography sx={{ mb: 2 }} variant="h6">
                Location
              </Typography>
            </FormLabel>
            <Autocomplete
              id="district"
              name="district"
              label={"District"}
              options={bangladeshDistricts}
              onChange={(e, newValue) =>
                formik.setFieldValue("district", newValue?.label || null)
              }
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
              sx={{ mb: "1rem" }}
            />
            <Autocomplete
              id="city"
              name="city"
              label={"City"}
              options={getUpazilas(formik.values.district) || []}
              onChange={(e, newValue) =>
                formik.setFieldValue("city", newValue?.label || null)
              }
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled={!formik.values.district}
            />
          </Box>
          <Box>
            <FormLabel>
              <Typography
                sx={selectedFiles.length > 0 ? { color: "primary.main" } : {}}
                variant="h6"
              >
                Add up to 5 photos
              </Typography>
            </FormLabel>
            <Box>
              {/* Preview Image */}
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                mt={2}
              >
                {selectedFiles.map((file, index) => (
                  <Box
                    key={index}
                    mb={2}
                    position={"relative"}
                    sx={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",

                      "&:hover": {
                        "& svg": {
                          display: "block",
                        },
                      },

                      "& svg": {
                        display: "none",
                      },

                      "& img": {
                        width: "100px",
                        height: "auto",
                      },
                    }}
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <IconButton
                      variant="contained"
                      onClick={() => handleRemoveFile(index)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: 0,
                        minWidth: 0,
                        width: "20px",
                        height: "20px",
                        p: 1,
                      }}
                    >
                      <Cancel
                        color="error"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  multiple
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileSelect}
                  // file limit 5
                />
                <label htmlFor="file">
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <Image
                      src={Images.UPLOAD_PLACEHOLDER}
                      alt="upload"
                      width={100}
                      height={100}
                      style={{
                        display: selectedFiles.length > 0 ? "none" : "",
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <Image
                      src={Images.UPLOAD_PLACEHOLDER}
                      alt="upload"
                      width={100}
                      height={100}
                      style={{
                        display: selectedFiles.length > 1 ? "none" : "",
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <Image
                      src={Images.UPLOAD_PLACEHOLDER}
                      alt="upload"
                      width={100}
                      height={100}
                      style={{
                        display: selectedFiles.length > 2 ? "none" : "",
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <Image
                      src={Images.UPLOAD_PLACEHOLDER}
                      alt="upload"
                      width={100}
                      height={100}
                      style={{
                        display: selectedFiles.length > 3 ? "none" : "",
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <Image
                      src={Images.UPLOAD_PLACEHOLDER}
                      alt="upload"
                      width={100}
                      height={100}
                      style={{
                        display: selectedFiles.length > 4 ? "none" : "",
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    component="span"
                    fullWidth={true}
                    sx={{ mt: 1 }}
                  >
                    {`Upload Photos (${selectedFiles.length}/${fileCountLimit})`}
                  </Button>
                </label>
                <Typography variant="caption" color="warning.main">
                  {fileError}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          fullWidth={true}
          type="submit"
        >
          POST
        </Button>
      </Box>
    </Grid>
  );
};

export default DefaultProductPostForm;
