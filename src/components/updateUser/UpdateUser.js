import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import "./updateUser.css"
import { Update as update } from '../../website/context/updateUser';
import Cookies from 'js-cookie';
const UpdateUser = (props) => {
   const IsOpen = useContext(update)
    const [formData,setformData]= useState({username : "",bio:'',location:""})

    // const validationSchema = Yup.object().shape({
    //     username: Yup.string()
    //         .min(3, 'name length must be more than 3 chars '),
    //     bio: Yup.string()
    //         .min(5,'bio  length must be more than 5 chars '),
  
    //     location: Yup.string()
    //         .min(2,'location  length must be more than 2 chars '),

    // });

 
    const onSubmit = async (data) => {
        data.preventDefault()
     if(formData.username.length !== 0)   
       if(formData.username.length < 3)
        return toast.error("name length must be more than 3 chars ")
     if(formData.bio.length !== 0)
      if(formData.bio.length < 5 )
        return toast.error("bio  length must be more than 5 chars ")
     if(formData.location.length !== 0)
     if(formData.location.length > 10 )
        return toast.error("location  length must be less than 10 chars")
    if(formData.location.length === 0 &&  formData.bio.length === 0 && formData.username.length === 0) 
       return  IsOpen.setIsoOpen(false)
      
    
    await  axios.put("https://facebookclone-production.up.railway.app/api/users/getuser/"+Cookies.get("userId"),formData,{
        headers:{
            Authorization:`bearer ${Cookies.get("userToken")}`
        }
    }).then((res)=>{
          console.log(res)
        IsOpen.setIsoOpen(false)
      }).catch((err)=>{
        console.log(err)
      })
    };

    return (
        <div className="register-container">
            <ToastContainer position="bottom-right"/>
            <div className="register-form">
                <h2>Update Profile</h2>
                <form onSubmit={onSubmit}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label>userNmae</label>
                        <input type="text"  value={formData.username} onChange={(ele)=>{
                               setformData({...formData,username:ele.target.value})
                        }} />
                    </div>

                    {/* Email Input */}
                    <div className="form-group">
                        <label>Bio</label>
                        <input type="text"  value={formData.bio} onChange={(ele)=>{
                               setformData({...formData,bio:ele.target.value})
                        }}/>
                    </div>

                    {/* Password Input */}
                    <div className="form-group">
                        <label>password</label>
                        <input type="password"  onChange={(ele)=>{
                               setformData({...formData,password:ele.target.value})
                        }}/>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="form-group">
                        <label>location</label>
                        <input type="text" value={formData.location}onChange={(ele)=>{
                               setformData({...formData,location:ele.target.value})
                        }} />
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

export default UpdateUser;