import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admins").then((res) => setAdmins(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admins/${id}`).then(() => {
      setAdmins(admins.filter((admin) => admin._id !== id));
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Admin List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(admin._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminList;
