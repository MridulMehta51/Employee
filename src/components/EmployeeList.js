import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((res) => setEmployees(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/employees/${id}`).then(() => {
      setEmployees(employees.filter((employee) => employee._id !== id));
    });
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(employee._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
