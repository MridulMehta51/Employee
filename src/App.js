import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [employees, setEmployees] = useState([]);

  // Function to fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch employees when the component loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Management System
      </Typography>
      <EmployeeForm fetchEmployees={fetchEmployees} />
      <EmployeeTable employees={employees} />
    </Container>
  );
}

export default App;