import React, { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseinit";

const paginationModel = { page: 0, pageSize: 5, pageCount: 3, rowCount: 30 };

const Home = () => {
  const [data, setData] = useState([]);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  const columns = [
    {
      field: "sno",
      headerName: "S.NO",
      width: 60,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: "id", headerName: "ID", width: 200, flex: 0 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 0,
      valueGetter: (values, data) =>
        `${data.FirstName || ""} ${data.LastName || ""}`,
    },

    {
      field: "age",
      headerName: "Age",
      width: 70,
      flex: 0,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      flex: 0,
      renderCell: (params) => {
        const bgColor =
          params.value?.toLowerCase() === "female" ? "#ec4899" : "#3b82f6";

        return (
          <p
            style={{
              textTransform: "capitalize",
              width: "70%",
              height: "60%",
              marginTop: "0.4rem",
              textAlign: "center",
              padding: "0.15rem 0.45rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              backgroundColor: bgColor,
              color: "white",
            }}
          >
            {params.value}
          </p>
        );
      },
    },

    { field: "email", headerName: "Email", width: 200, flex: 0 },
    {
      field: "phone",
      headerName: "Mobile",
      type: "number",
      width: 140,
      flex: 0,
    },
    {
      field: "action",
      headerName: "Action",
      type: "button",
      width: 200,
      flex: 0,
      renderCell: (params) => (
        <>
          <Button
            sx={{
              textTransform: "capitalize",
              padding: "0.25rem 0.75rem",
              textAlign: "center",
              display: "inline-block",
              borderRadius: "9999px",
              backgroundColor: "#3b82f6",
              color: "white",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#16a34a",
              },
            }}
            variant="contained"
            color="primary"
            component={Link}
            to={`/update/${params.row.id}`}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            sx={{
              textTransform: "capitalize",
              marginLeft: "5px",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: "#ef4444",
              color: "white",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="bg-slate-500 py-10 min-h-screen flex flex-col items-center px-4">
        <div className="w-full max-w-4xl flex justify-between items-center mb-0">
          <div></div>
          <Link to="/create">
            <Button variant="contained" color="success">
              Add New
            </Button>
          </Link>
        </div>
        <div className="w-full max-w-6xl">
          <div className="text-center justify-center text-2xl md:text-3xl font-bold py-4 text-black-200">
            List of Users
          </div>
          <Paper sx={{ height: "80%", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20, 30]}
              //   checkboxSelection
              //   sx={{ border: 0 }}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};
export default Home;
