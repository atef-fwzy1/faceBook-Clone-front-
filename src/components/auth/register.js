import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import swal from 'sweetalert';

import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    // Validation schema using Yup
    const [formData,setformData]= useState({
       "username" :"eslaam ",
              "email" :"atef_fawzy@gmail.com",
            "password" : "eslamm gamal 458"
    })
    const Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('userName is required ')
            .min(3, 'name length must be more than 3 chars '),
        email: Yup.string()
            .required('email is required ')
            .email('email must be valid '),
        password: Yup.string()
            .required("password is required ")
            .min(6,"password  length must be more than 3 chars"),
        confirmPassword: Yup.string()
            .required('confirm password  is required')
            .oneOf([Yup.ref('password'), null], 'Password does not match'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
    await  axios.post("http://localhost:8080/api/auth/register",formData).then((res)=>{
        swal("Don ", "Joined successfully!", "success").then(()=>{
            Navigate("/login")
        })
      }).catch((err)=>{
          swal("warning!", "Failed to join due to server error!", "warning");
      })
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label>userNmae</label>
                        <input type="text" {...register('name')} onChange={(ele)=>{
                               setformData({...formData,username:ele.target.value})
                        }} />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" {...register('email')} onChange={(ele)=>{
                               setformData({...formData,email:ele.target.value})
                        }}/>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="form-group">
                        <label>password</label>
                        <input type="password" {...register('password')}  onChange={(ele)=>{
                               setformData({...formData,password:ele.target.value})
                        }}/>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="form-group">
                        <label>confirm password</label>
                        <input type="password" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-submit">
                        create 
                    </button>
                </form>
                <Link to={"/login"} style={{display: "flex", alignItems: "center",justifyContent: "center",marginTop:"15px"}}>
                          <span className="goThere">go to login</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
             </Link>
            </div>
        </div>
    );
};

export default RegisterForm;