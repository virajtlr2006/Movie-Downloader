import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

export default function Login() {
    const [errormsg, seterrormsg] = useState(null)



  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", formData);
      console.log(response);
      
      localStorage.setItem("email",formData.email)
      // Optionally redirect after successful signup
      navigate("/");
    } catch (error) {
      seterrormsg(error.response.data.msg)
     
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email ID"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}


        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        {/* Submit Button */}
        {errormsg && <p>{errormsg}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}