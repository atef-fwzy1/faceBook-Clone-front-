import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Update } from '../../website/context/updateProfile';
import { useContext } from 'react';
import "./updateProfile.css"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const UpdateProfile = (props) => {
   const IsOpen = useContext(Update)
    const [formData,setformData]= useState(props)

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'name length must be more than 3 chars '),
        bio: Yup.string()
            .min(5,'bio  length must be more than 5 chars '),
  
        location: Yup.string()
            .min(2,'location  length must be more than 2 chars '),

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
    await  axios.put("http://localhost:8080/api/users/getuser/"+Cookies.get("userId"),formData,{
        headers:{
            Authorization:`bearer ${Cookies.get("userToken")}`
        }
    }).then((res)=>{
      
        IsOpen.setIsoOpen(false)
      }).catch((err)=>{
        console.log(err)
      })
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Update Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label>userNmae</label>
                        <input type="text" {...register('username')} value={formData.username} onChange={(ele)=>{
                               setformData({...formData,username:ele.target.value})
                        }} />
                        {errors.username && <p className="error">{errors.username.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="form-group">
                        <label>Bio</label>
                        <input type="text" {...register('bio')} value={formData.bio} onChange={(ele)=>{
                               setformData({...formData,bio:ele.target.value})
                        }}/>
                        {errors.bio && <p className="error">{errors.bio.message}</p>}
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
                        <label>location</label>
                        <input type="text" {...register('location')} value={formData.location}onChange={(ele)=>{
                               setformData({...formData,location:ele.target.value})
                        }} />
                        {errors.location && <p className="error">{errors.location.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-submit">
                       Update 
                    </button>
                </form>
               <i class="closeUpdate bi bi-x" onClick={()=>IsOpen.setIsoOpen(false)}></i>
            </div>
        </div>
    );
};

export default UpdateProfile;