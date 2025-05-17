import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Update } from '../../website/context/updateProfile';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { Post as postUpdate } from '../../website/context/updatePost';
import "./updatepost.css"
import Loader from '../loader/Loader';
export default function UpdatePost(props){
    const IsUPdatePost = useContext(postUpdate)
      const IsOpen = useContext(Update)
        const [formData,setformData]= useState({description:""})
       const [newImage,setNewimage] = useState("")
       const [showLoader,setShowLoader]  =useState(false)
    const Token = Cookies.get("userToken")
      console.log(IsUPdatePost)
      console.log(Token)
    
        const onSubmit =  (data) => {
            if(formData.length === 0 && newImage.length === 0)
                 return IsUPdatePost.setIsoOpen("")
            setShowLoader(true)
            data.preventDefault() 
            const form = new FormData();
            if(formData.description.length >= 2)
              form.append("description",formData.description)
            form.append("image",newImage[0])
            axios({ method: 'put',url:"https://facebookclone-production.up.railway.app/api/posts/"+IsUPdatePost.IsOpen,data:form, headers:{
                Authorization :"bearer "+Token
          }}).then((res)=>{
            console.log(res)
            setShowLoader(false)
            IsUPdatePost.setIsoOpen("")
          }).catch((err)=>{
            console.log(err)
            setShowLoader(false)
            IsUPdatePost.setIsoOpen("")
          })}
    return(
        <div className="register-container">
            <div className="register-form">
                <h2>Update Post</h2>
                <form onSubmit={onSubmit}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label>description</label>
                        <input type="text" value={formData.description} onChange={(ele)=>{
                               setformData({...formData,description:ele.target.value})
                        }} />
             
                    </div>

                            
                    <label htmlFor="file-upload" className="custom-file-upload">
                    <img  htmlFor="file-upload"  className="uplodImage" src='https://res.cloudinary.com/dfbgnqvbi/image/upload/v1747008309/gallery_dyevxr.png' alt='uplod image '/>
                        </label>
                        <input
                        id="file-upload"
                        className="choseImage"
                        type="file"
                        onChange={(ele) => setNewimage(ele.target.files)}
                        />


                       

                                             {/* Submit Button */}
                    <button  type="submit" style={{ display: "flex",alignItems: "center",justifyContent: "center",cursor:showLoader &&"none",color:showLoader === true&&"#092d54"}} className="btn-submit" >
                      {showLoader?"Loading....":"Update" }
                    </button>
                </form>
               <i class="closeUpdate bi bi-x" onClick={()=>IsUPdatePost.setIsoOpen("")}></i>
            </div>
        </div>
    )
}