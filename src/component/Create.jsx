import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    gender: "",
  });
  console.log("values", values);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email); // Only Gmail validation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(values.email)) {
      setError("Only Gmail addresses are allowed!");
      return;
    }
    setValues({ name: "", email: "", phone: "", gender: "" });

    // First, get the existing users from db.json
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const users = res.data;
        const newId =
          users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

        // Create new user with the next ID
        const newUser = { ...values, id: String(newId) };

        //  Post new user
        return axios.post("http://localhost:3000/users", newUser);
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="w-full max-w-lg bg-cyan-100 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {" "}
          Add New User
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-2">
            <label className=" text-gray-700 font-medium mb-1">
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
          {/* Last Name */}
          <div className="mb-2">
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
          {/* Email */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your Email"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          {/* Phone */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Phone"
              required
            />
          </div>
          {/* Gender */}
          <div className="mb-2">
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
              Submit
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

export default Create;
