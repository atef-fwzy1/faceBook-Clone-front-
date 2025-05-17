import React, { useContext, useEffect, useState } from "react";
import "./viset.css"
import axios from "axios";
import Cookies from 'js-cookie';
import Post from "../post/post";
import UpdateProfile from "../UpdateProfile/upadteProfile";
import { Update } from "../../website/context/updateProfile";
import { Link, useParams } from "react-router-dom";
const Viset = () => {
    const IsOpen = useContext(Update)

    const [user,setUser] = useState({avatar
: 
{url: 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg', publicId: null},createdAt: "2025-04-09T19:40:07.591Z",email: "lafwzy648@gmail.com",isAcountVerified: false,isAdmin: false,token: "eyJhbGciOiJIUzI1NFtZSI6ImF0Z6ImxM",updatedAt:"2025-04-09T19:41:25.075Z",username: "atef fawzy",_id: "67f6cd17fe18120b2ae39f2d"});
    const [posts,setPosts] = useState([]);

   const {id} = useParams("id")
    useEffect(()=>{
     axios.get("https://facebookclone-production.up.railway.app/api/users/getuser/"+id)
     .then((res)=>{
         setPosts(res.data.posts)
       setUser(res.data.data.User[0])
     }).catch((err)=>{
        console.log(err)
     })
    },[])

    const showPosts =posts.map((ele)=>{
       return <Post construction = {ele.construction} profilePicture={ ele.user.avatar.url|| ""} username ={ ele.user.username}  text={ele.description} image= {ele.image.url} likes={ele.likes}  isAcountVerified={ele.user.isAcountVerified} postId = {ele._id} comment ={ele.comments} postLikes = {ele.likes}/>
          
    })
 const Join_Sinceuser = user.createdAt.split("-")[0] +"-"+ user.createdAt.split("-")[1]

  return (
    <>

    <div className="profile-container">
      <div style={{backgroundImage:`url(${user.avatar.url})`,backgroundPosition:"top",position:"relative"}} className="header-cover" ><Link to={"/"}><i class=" goHome bi bi-arrow-left-circle-fill"></i></Link></div>
      <div className="profile-content container">
        <div className="profile-image-wrapper">
          <img
            src={user.avatar.url}
            alt="Profile"
            className="profile-image"
          />
             
             
        </div>
        <div className="profile-info">
          <button className="edit-btn" onClick={()=>IsOpen.setIsoOpen(true)}><i class="bi bi-person-fill-add"></i></button>
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
          {  showPosts}
        </div>
      </div>
    </div>
   
      { IsOpen.IsOpen &&  <UpdateProfile username={user.username} bio={user.bio} location={user.location}/>}
      
    </>
  );
};

export default Viset;
