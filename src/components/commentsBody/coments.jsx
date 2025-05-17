import React, { useContext, useEffect, useState } from 'react';
import './coments.css';
import { Comments } from '../../website/context/Comments';
import axios from 'axios';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const PostWithComments = () => {

    const ShowComm = useContext(Comments)
  const [comments, setComments] = useState([]);
  const [render, setrender] = useState(1);
  const [newComment, setNewComment] = useState('');
    const Token = Cookies.get("userToken")
    const currId = Cookies.get("userId")
  
    const handleAddComment = (e) => {
      e.preventDefault()
    let data  ={
    postId:ShowComm.IsOpen[0],
    content:newComment
    }

   axios.post("https://facebookclone-production.up.railway.app/api/comments",data, {headers:{
              "Authorization" :`${"bearer "+Token} `
        }}).then((res)=>{
          console.log(res)
          setrender(render + 1 )
          setNewComment("")
        }).catch((err)=>{
          swal("You must log in or register to continue.");
        })
         
  };
  

useEffect(()=>{
  axios.get("https://facebookclone-production.up.railway.app/api/comments/postComment/"+ShowComm.IsOpen[0]).then((res)=>{
setComments(res.data.commentsPost)}).catch((err)=>{
  console.log(err)
})
},[render])

function deleteComm(commId){
   axios({ method: 'delete',url:"https://facebookclone-production.up.railway.app/api/comments/"+commId, headers:{
          Authorization :`${"bearer "+Token} `
          }}).then((res)=>{
            console.log(res)
            setrender((priv)=> priv + 1)
          }).catch((err)=>{
              console.log(err)
          })     
}

 let ShowComments  = comments.map((ele)=>{

  const isoDate = ele.createdAt
const date = new Date(isoDate);
const formatted = date.getFullYear() + "-" +
  String(date.getMonth() + 1).padStart(2, '0') + "-" +
  String(date.getDate()).padStart(2, '0') 

     return <div key={ele._id}>
      <div className='comm_cont' >

      <div className='iamgeUser' style={{justifyContent: "space-between"}}>
        <div className='iamgeUser'>

        <img src={ele.construction.avatar.url}></img>
        <span className='name'>{ele.userName}</span>
        {ele.userIsVerified&&<i style={{margin:"0px 6px"}} className='bi bi-patch-check-fill verified-icon'></i>}
        </div>
        <span className="timestamp" style={{position:"relative"}}> <span className='date'>{formatted}</span> <div><span style={{fontSize:"22px",cursor:"pointer"}} >{(ele.construction._id === currId || ele.postId.construction ===currId ) &&<i onClick={()=>deleteComm(ele._id)}  style={{fontSize:"15px"}} className="deleteComm bi bi-trash3"></i>}</span>
    
                 </div></span>
          
      </div>
      <span className='connt'>{ele.content}</span>
      </div>
      </div>
 })
  return (
    <div className='cont'>
       <ToastContainer position="bottom-right"/>
   
    <div className="post-container post-cont">
      <div className='owner'>
                <div className='iamgeUser'>

       <Link to={"/"+ShowComm.IsOpen[ShowComm.IsOpen.length - 1]}> <img src={ShowComm.IsOpen[2]}></img></Link>
        <span className='name'>{ShowComm.IsOpen[4]}</span>
        {ShowComm.IsOpen[ShowComm.IsOpen.length - 3]&&<i style={{margin:"0px 6px"}} className='bi bi-patch-check-fill verified-icon'></i>}
        </div>
        
      </div>
         <i class="close bi bi-x-circle" onClick={()=>ShowComm.setIsoOpen([])}></i>
      {/* قسم الصورة */}
      <div className="image-section" >
         {ShowComm.IsOpen[1]? <img src={ShowComm.IsOpen[1]} alt="Post" className="post-image" />:<span>{ShowComm.IsOpen[3]}</span>}
     
      </div>

    

      {/* قسم التعليقات */}
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length < 0 ? (
          <p>No Comments yet </p>
        ) : (
          <ul>
          {ShowComments}
          </ul>
        )}
      </div>

      {/* نموذج إضافة تعليق */}
      <form onSubmit={handleAddComment} className="comment-form">
        <input
          type="text"
          placeholder="Add Comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

     
    </div>
     </div>
  );
};

export default PostWithComments;