// src/components/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './dashBoard.css';
import axios from 'axios';
import { Update } from '../../website/context/updateUser';
import UpdateUser from '../updateUser/UpdateUser';
import PostWithComments from '../commentsBody/coments';
import { Comments } from '../../website/context/Comments';
import Loader from '../loader/Loader';

const Dashboard = () => {
  const showForm = useContext(Update)
    const [allUsers , SetAlllusers] = useState([])
 const Token = Cookies.get("userToken")
 const UserId = Cookies.get("userId")
   const [page,setPage] = useState(1);
    const [loader,setLoader] = useState(false)
   const [render, setRender] = useState(0)
    const [post,setPost] = useState([]);
    const [show,setShow] = useState("users")
 var ShowComm = useContext(Comments)
    useEffect(()=>{
      setLoader(true)
        axios({ method: 'get',url:"https://facebookclone-production.up.railway.app/api/users/profile", headers:{
            Authorization :"bearer "+Token
            }}).then((res)=>{
                SetAlllusers(res.data.data.ALlUsers)
                setLoader(false)
              }).catch((err)=>{
              setLoader(false)
                console.log(err)
            })  

    },[render])


     useEffect(()=>{
      setLoader(true)
        axios.get(`https://facebookclone-production.up.railway.app/api/posts`).then((res)=>{
        if(res.data.post.length === 0)
          setPage(1)
          setPost(res.data.post)
          setLoader(false)
       }).catch((err)=>{
          console.log(err)
          setLoader(false)
       })
      },[render])

function deleteuser(userId){
  setLoader(true)
  axios.delete("https://facebookclone-production.up.railway.app/api/users/getuser/"+userId,{
    headers:{
        Authorization :`${"bearer "+Token} `
    }
 })
 .then((res)=>{
  setRender(render + 1)
  setLoader(false)
 
 }).catch((err)=>{
  setLoader(false)
    console.log(err)
 })

}    
function deletepot(postId){
  setLoader(true)
   axios({ method: 'delete',url:`https://facebookclone-production.up.railway.app/api/posts/` + postId, headers:{
    Authorization :"bearer "+Token
    }}).then((res)=>{
      setLoader(false)
      setRender(render + 1)
       }).catch((err)=>{
          console.log(err)
          setLoader(false)
       })
}  
    let comments  = 0;
    let likes  = 0;
      const showPosts = post.map((ele,ind)=>{
        comments +=  ele.comments.length
        likes +=  ele.likes.length
        // setnumOfComments((prev) => ele.comments.length + prev)
        // setnumOfLikes((prev) => ele.likes.length + prev)
 

    
        return(
          <tr key={ele._id}>
            <td>
              <div className='profiel'>
          {ele.image.url !== "" &&  <img src={ele.image.url} alt="Profile Picture" />}
              <span>{ele.user.username}</span>
              </div>
            </td>
            <td>
             <span>{ele.user.email}</span>
              
            </td>
            <td>
            <span className='postTitle'>{ele.description.length >0  ?ele.description.slice(0,15)+"..":"No Title !"}</span>
             
            </td>
            <td>
              <span class="status in-progress" style={{backgroundColor:ele.user.isAdmin?"#28a745":"#dc3545"}}>{ele.user.isAdmin?"True":"False"}</span>
            </td>
            <td className='action'>
 <div>
 <i style={{color:"red" , fontSize:"20px" ,cursor:"pointer"}}  className='bi bi-trash' onClick={()=> deletepot(ele._id)}></i>
 <i  style={{color:"green" , fontSize:"20px" ,cursor:"pointer"}}  class="bi bi-eye-fill" onClick={()=> 
  ShowComm.setIsoOpen([ele._id,ele.image.url,ele.user.avatar.url,ele.description,ele.user.username,ele.user.isAcountVerified,ele.construction])}></i>
  
 </div>
            </td>
          </tr>
        
        
    )

      })
   const showAllUsers = allUsers.map((ele)=>{
if(ele._id !== UserId)
    return(
          <tr key={ele._id}>
            <td>
              <div className='profiel'>
              <img src={ele.avatar.url} alt="Profile Picture" />
              <span>{ele.username}</span>
              </div>
            </td>
            <td>
             <span>{ele.email}</span>
              
            </td>
            <td>
            <span class="status in-progress" style={{backgroundColor:ele.isAcountVerified?"#28a745":"#dc3545"}}>{ele.isAcountVerified?"True":"False"}</span>
             
            </td>
            <td>
              <span class="status in-progress" style={{backgroundColor:ele.isAdmin?"#28a745":"#dc3545"}}>{ele.isAdmin?"True":"False"}</span>
            </td>
            <td className='action'>
 <div>
 <i style={{color:"red" , fontSize:"20px" ,cursor:"pointer"}}  className='bi bi-trash' onClick={()=>deleteuser(ele._id)} ></i>
<i style={{color:"green" , fontSize:"20px",cursor:"pointer"}} className='bi bi-pencil-fill' onClick={()=> showForm.setIsoOpen(true)}></i>
 </div>
            </td>
          </tr>
        
        
    )
   }) 
 return(
    <div className='dashCont'>
    <div class="stats-container">
      <div class="stat-card blue mange" onClick={()=>setShow("users")} style={{cursor:"pointer"}}>
        <div class="card-header">
          <span>All Users <i class="bi bi-people"></i></span>
          <i class="arrow-up"></i>
        </div>
        <div class="card-body">
          <h2>{allUsers.length}</h2>
     
        </div>
      </div>
      <div class="stat-card green mange" onClick={()=>setShow("posts")} style={{cursor:"pointer"}}>
        <div class="card-header">
          <span>All Posts <i class="bi bi-postcard-heart-fill"></i> </span>
          <i class="arrow-up"></i>
        </div>
        <div class="card-body">
          <h2>{post.length}</h2>
    
        </div>
      </div>
      <div class="stat-card orange mange" >
        <div class="card-header">
          <span>Num Likes  <i class="bi bi-hand-thumbs-up-fill"></i></span>
          <i class="arrow-down"></i>
        </div>
        <div class="card-body">
          <h2>{likes}</h2>
         
        </div>
      </div>
      <div class="stat-card red mange">
        <div class="card-header">
          <span>Num Comments  <i class="bi bi-chat-heart-fill"></i></span>
          <i class="arrow-down"></i>
        </div>
        <div class="card-body">
          <h2>{comments}</h2>
        
        </div>
      </div>
    </div>
    <div class="table-container">
      <div class="table-header">
        <h2>All Users  <i class="bi bi-people"></i></h2>
        <i class="sort-arrow"></i>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {show === "users" ? <th>veryfiy <i className='bi bi-patch-check-fill verified-icon'></i></th> :<th>Title  </th>}
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
       { show=== "users"? showAllUsers:showPosts}
        </tbody>
      </table>
    </div>
    
    { showForm.IsOpen && <UpdateUser/>}
 {show !== "users" &&
     <div className="pagination">
     <i onClick={()=>{
        if(page > 3 )
           setPage((prev)=> prev-3)
        window.scrollTo(0,0)
     }} className="bi bi-arrow-left-circle-fill"></i>
     <i onClick={()=>{
           setPage((prev)=> prev+3)
           window.scrollTo(0,0)
     }}  className="bi bi-arrow-right-circle-fill"></i>
           </div>

 }
{ShowComm.IsOpen.length > 0 && <PostWithComments/>}
{loader&& <Loader/>}
    </div>
 )
};

export default Dashboard;