import React, { useState } from 'react';


import axios from 'axios';
import { AddPost } from '../../website/context/newPost';
import { useContext } from 'react';
import "./newPost.css"
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Loader from '../loader/Loader';
const NewPost = (props) => {
   const IsOpen = useContext(AddPost)
    const [formData,setformData]= useState({title:"",description:"",image:null});
    const [loader,setLoader] = useState(false)



    const onSubmit = async (even) => {
        setLoader(true)
        even. preventDefault();
        if(formData.description.length < 2)
                return toast.error("description  length must be more than 5 chars ")
        const formdata = new FormData();
        formdata.append("description",formData.description )
        formdata.append("category","new post , new post")
        if(formData.image !== null)
        formdata.append("image",formData.image)

    await  axios.post("https://facebookclone-production.up.railway.app/api/posts",formdata,{
        headers:{
            Authorization:`bearer ${Cookies.get("userToken")}`
        }
    }).then((res)=>{
        IsOpen.setIsoOpen(false)
        setLoader(false)
    }).catch((err)=>{
          setLoader(false)
        console.log(err)
      })
    };

    return (
        <div className="register-container">
            <ToastContainer/>
            <div className="register-form">
                <h2> Add New Post</h2>
                <form onSubmit={(even)=>onSubmit(even)}>
                   

                    <div className="form-group">
                        <label>description</label>
                        <input type="text"   onChange={(ele)=>{
                               setformData({...formData,description:ele.target.value})
                        }}/>
                    </div>
                           {formData.image === null &&  <input type="file"  onChange={(ele)=>setformData({...formData,image:ele.target.files[0]})} /> }
                    
                    {/* <i class="bi bi-camera" ></i>  */}
                <div className='image'>
                    <img src={formData.image !== null  &&URL.createObjectURL(formData.image)} alt='errr'/>
                </div>
                    <button type="submit" className="btn-submit">
                    {loader?<Loader/>:"Submit" }
                    </button>
                </form>
               <i class="closeUpdate bi bi-x" onClick={()=>IsOpen.setIsoOpen(false)}></i>
            </div>
        </div>
    );
};

export default NewPost;