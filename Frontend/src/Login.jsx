import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'


const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onsubmit = async (data) => {
    console.log(data);
    const api = await axios.post("http://localhost:8080/api/signinnew",data)
    console.log(api.data.token);
    localStorage.setItem("token",api.data.token)
    
    
  }
  return (
    <div>
       <form onSubmit={handleSubmit(onsubmit)}>
      
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true })} />
  
      <input type="submit" />
    </form>
    </div>
  )
}

export default Login
