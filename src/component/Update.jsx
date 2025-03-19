import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Update = () => {
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://user-data-ce182-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`
  //     )

  //     .then((res) => {
  //       const user = res.data;
  //       console.log("Fetched user data:", user);
  //       setValues({
  //         id: user.id || "",
  //         FirstName: user.FirstName || "",
  //         LastName: user.LastName || "",
  //         age: user.age || "",
  //         email: user.email || "",
  //         phone: user.phone || "",
  //         gender: user.gender || "",
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  useEffect(() => {
    axios
      .get(
        "https://user-data-ce182-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      )
      .then((res) => {
        if (res.data) {
          const users = Object.entries(res.data).map(([key, user]) => ({
            id: key, // Firebase-generated unique key
            ...user,
          }));
          const foundUser = users.find((user) => user.id === id);
          if (foundUser) {
            setValues(foundUser);
          } else {
            console.log("User not found");
          }
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(
  //       `https://user-data-ce182-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`,
  //       values
  //     )
  //     .then(() => {
  //       navigate("/"); //
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.id) {
      console.error("Error: User ID is missing.");
      return;
    }

    axios
      .put(
        `https://user-data-ce182-default-rtdb.asia-southeast1.firebasedatabase.app/users/${values.id}.json`,
        values
      )
      .then(() => {
        navigate("/"); // Redirect to home
      })
      .catch((err) => console.log("Error updating user:", err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="w-full max-w-lg bg-cyan-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update User Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              FirstName:
            </label>
            <input
              type="text"
              name="FirstName"
              value={values.FirstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter your FirstName"
              required
            />
          </div>

          {/* Last name */}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              LastName:
            </label>
            <input
              type="text"
              name="LastName"
              value={values.LastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter your LastName"
              required
            />
          </div>
          {/* Age */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              placeholder="Enter your Age"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email (Gmail Only):
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your Gmail"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Gender Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Gender:
            </label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex flex-row spaces-between gap-8 py-5">
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="w-[500] text-white py-5 px-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Update
            </Button>
            <div>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
