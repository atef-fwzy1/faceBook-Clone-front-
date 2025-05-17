import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import swal from 'sweetalert';
import "./auth.css"
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = () => {
    // Validation schema using Yup
    const [formData,setformData]= useState({
              "email" :"",
            "password" : ""
    })
    const Navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('email is required ')
            .email('email must be valid '),
        password: Yup.string()
            .required("password is required ")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
    await  axios.post("https://facebookclone-production.up.railway.app/api/auth/login",formData).then((res)=>{
        swal({
            title: "success !",
            text: "User are  registered successfly !",
            icon: "success",
          });
        
             const token  = res.data.data.findUser.token
             const id  = res.data.data.findUser._id
             Cookies.set('userToken',token , { expires: 20});
             Cookies.set('userId',id , { expires: 20});
             Navigate("/")
      }).catch((err)=>{
        // User not registered
        swal({
            title: "Error !",
            text: "User not registered!",
            icon: "error",
          });
      })
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                   

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

                    {/* Submit Button */}
                    <button type="submit" className="btn-submit">
                        create 
                    </button>
                </form>
                    <Link to={"/register"} style={{display: "flex", alignItems: "center",justifyContent: "center",marginTop:"15px"}}>
                          <span className="goThere">go to register</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
                    </Link>
            </div>
        </div>
    );
};

export default LoginForm;