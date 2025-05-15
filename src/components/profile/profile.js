import React, { useContext, useEffect, useState } from "react";
import "./profile.css"
import axios from "axios";
import Cookies from 'js-cookie';
import Post from "../post/post";
import UpdateProfile from "../UpdateProfile/upadteProfile";
import UpdatePost from"../updatePost/updatepost"
import { Update } from "../../website/context/updateProfile";
import add_image from "../../images/add-image.png"
import write from "../../images/write.png"
import NewPost from "../addPost/NewPsot";
import { AddPost } from "../../website/context/newPost";
import PostWithComments from "../commentsBody/coments";
import { Comments } from "../../website/context/Comments";
import { Link, useNavigate } from "react-router-dom";
import { Post as postUpdate } from "../../website/context/updatePost";
const Profile = () => {
   var ShowComm = useContext(Comments)
    const IsOpen = useContext(Update)
    const Isaddpost = useContext(AddPost)
    const IsUPdatePost = useContext(postUpdate)
  const navigate = useNavigate()
    const [user,setUser] = useState({avatar
: 
{url: 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg', publicId: null},createdAt: "2025-04-09T19:40:07.591Z",email: "lafwzy648@gmail.com",isAcountVerified: false,isAdmin: false,token: "eyJhbGciOiJIUzI1NFtZSI6ImF0Z6ImxM",updatedAt:"2025-04-09T19:41:25.075Z",username: "atef fawzy",_id: "67f6cd17fe18120b2ae39f2d"});
    const [posts,setPosts] = useState([]);
    const Token = Cookies.get("userToken")

    useEffect(()=>{
     axios.get("http://localhost:8080/api/users/getuser",{
        headers:{
            Authorization :`${"bearer "+Token} `
        }
     })
     .then((res)=>{
       setUser(res.data.data.currentUser[0])
       setPosts(res.data.posts)
     
     }).catch((err)=>{
        console.log(err)
     })
    },[])
    
    function deleteuser(userId){
      axios.delete("http://localhost:8080/api/users/getuser/"+userId,{
        headers:{
            Authorization :`${"bearer "+Token} `
        }
     })
     .then((res)=>{
      Cookies.delete("userToken")
      Cookies.delete("userId")
      navigate("/login")
     
     }).catch((err)=>{
        console.log(err)
     })
    
    } 
    const showPosts =posts.map((ele)=>{
         return <Post profilePicture={user.avatar.url} username ={ ele.user.user_name}  text={ele.description} image= {ele.image.url} postLikes={ele.likes}  postId={ele._id}isAcountVerified = {user.isAcountVerified} construction = {ele.construction} comment ={ele.comments}/>
        
    }).reverse()
   const Join_Sinceuser = user.createdAt.split("-")[0] +"-"+ user.createdAt.split("-")[1]
function changeImage(file){

//! upload image with fromdata 
const formData = new FormData();
    formData.append("image",file[0])
        axios({ method: 'post',url:"http://localhost:8080/api/users/photo-uplaod",data:formData, headers:{
              Authorization :`${"bearer "+Token} `
        }}).catch((err)=>{
            console.log(err)
        })


}
  return (
    <>
    <div className="profile-container">
      <div style={{backgroundImage:`url(${user.avatar.url})`,backgroundPosition:"top"}} className="header-cover"><Link to={"/"}><i class=" goHome bi bi-arrow-left-circle-fill"></i></Link></div>
  
      <div className="profile-content container">
        <div className="profile-image-wrapper">
          <img
            src={user.avatar.url}
            alt="Profile"
            className="profile-image"
          />
             <form>

            <input type="file"  onChange={(ele)=>changeImage(ele.target.files)} /><i class="bi bi-camera" ></i> 
             </form>
             
        </div>
        <div className="profile-info">
          <button className="edit-btn" onClick={()=>IsOpen.setIsoOpen(true)}>Edit Profile</button>
          <h2>
            {user.username} {user.isAcountVerified && <i style={{fontSize:"15px"}} className="bi bi-patch-check-fill verified-icon"></i>}
          </h2>
          <p className="username">@{user.username}</p>
          <p className="bio">  {user.bio}</p>
          <div className="details">
            <span><i className="bi bi-geo-alt"></i>{user.location}</span>
            <span><i className="bi bi-calendar3"></i> {Join_Sinceuser}</span>
          </div>
          <div className="follow-info">
            <span><strong>256</strong> Following</span>
            <span><strong>165</strong> Followers</span>
          </div>
        </div>
        <div className="tabs">
          <span className="active-tab">Tweets</span>
         
        </div>
        <div className="tweet">
          <div className="post-container add-post"> 
            <img src={add_image} onClick={()=> Isaddpost.setIsoOpen(true)}/>
            <img src={write} onClick={()=> Isaddpost.setIsoOpen(true)}/>
            

          </div>
          {  showPosts}
        </div>
      <button class="delete-button" onClick={()=> deleteuser(user._id)}>Delete Account</button>
      </div>
    </div>
   
      { IsOpen.IsOpen &&  <UpdateProfile username={user.username} bio={user.bio} location={user.location}/>}
      { Isaddpost.IsOpen &&  <NewPost/>}
             {ShowComm.IsOpen.length > 0 && <PostWithComments/>}
               {IsUPdatePost.IsOpen.length > 0 &&<UpdatePost/>}
    </>
  );
};

export default Profile;
