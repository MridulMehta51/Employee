import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box, Snackbar, Grid } from "@mui/material";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  position: yup.string().required("Position is required"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const EmployeeForm = ({ fetchEmployees }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Attempt to add the employee
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/employees`, data);
      fetchEmployees();
      reset(); // Reset the form after successful submission
      setSnackbarMessage("Employee added successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes("already exists")) {
          setSnackbarMessage(error.response.data.message); // Display error message
          reset(); // Reset form when email already exists
        } else {
          setSnackbarMessage("Failed to add employee");
        }
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Name Input */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              size="small"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          {/* Email Input */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {/* Phone Input */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              size="small"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          {/* Position Input */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Position"
              fullWidth
              margin="normal"
              size="small"
              {...register("position")}
              error={!!errors.position}
              helperText={errors.position?.message}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarMessage.includes("successfully") ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeForm;