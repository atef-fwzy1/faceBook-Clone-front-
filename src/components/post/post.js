import"./post.css"

import { useContext, useEffect, useState } from "react"
import { Comments } from "../../website/context/Comments"
import { Post as UpdatePost } from "../../website/context/updatePost"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import swal from 'sweetalert';
export default function Post(props){
    var ShowComm = useContext(Comments)
         const Token = Cookies.get("userToken")
            const userId = Cookies.get("userId")
            const [showList,setShowList] = useState(false)
         const [postLikes,setPostLikes] = useState(["empty"])
         const IsUPdatePost = useContext(UpdatePost)
         let [randumNum,setrandumNum] = useState(0)
      useEffect(()=>{
        setPostLikes(props.postLikes)
        setrandumNum(Math.ceil(Math.random() * (200  - 0) + 0))
      },[])
    function HndelLikes(postId){

        axios({ method: 'put',url:"https://facebookclone-production.up.railway.app/api/posts/likes/"+postId, headers:{
            Authorization :`${"bearer "+Token} `
            }}).then((res)=>{
                setPostLikes(res.data.Likes.likes)
            }).catch((err)=>{
                  swal("You must log in or register to continue.");
            })      
        
    }

 function deletepost(postId){
    setShowList(false)
    axios({ method: 'delete',url:"https://facebookclone-production.up.railway.app/api/posts/"+postId, headers:{
        Authorization :`${"bearer "+Token} `
        }}).then((res)=>{
          console.log(res)
        }).catch((err)=>{
            console.log(err)
        })     
 }
   
  return (
     <div className="post-container">
        <div className="post-header">
                <Link to={props.construction ===userId?"/profile":"/"+props.construction}>
                <div className="user-info">
                    <img  src={props.profilePicture} alt={`${props.username} Profile`} className="profile-picture" />
                    <span className="username">{props.username}</span>
                  {props.isAcountVerified && <i style={{fontSize:"15px"}} className="bi bi-patch-check-fill verified-icon"></i>}
                </div>
                </Link>
                <span className="timestamp" style={{position:"relative"}}>منذ ساعة <div><span style={{fontSize:"22px",cursor:"pointer"}} onClick={()=> {
                    if(props.construction != userId)
                        setShowList(false)
                    else
                        setShowList((priv)=>!priv)
                }}><i class="bi bi-three-dots"></i></span>
                 <ul style={{display:showList?"flex":"none"}} className="listChose"><li onClick={()=>{ deletepost(props.postId)
                 }}>Delete</li><li onClick={()=>{IsUPdatePost.setIsoOpen(props.postId)
                    setShowList(false)
                 }}>Edite</li></ul>
                 </div></span>
            </div>

            <div className="post-content">
                <p>{props.text}</p>
            </div>

            {props.image && (
                <div className="post-image">
                    <img  src={props.image} alt="Post" className="post-media"  onClick={()=> ShowComm.setIsoOpen([props.postId,props.image,props.profilePicture,props.text,props.username,props.isAcountVerified,props.construction])}/>
                </div>
            )}

       
            <div className="post-actions">
                <div className="action-item">
                     <div>
                        <span>{randumNum}</span>
                        <i class="bi bi-cursor-fill"></i>
                    </div>
                    <div  onClick={()=> ShowComm.setIsoOpen([props.postId,props.image,props.profilePicture,props.text,props.username,props.isAcountVerified,props.construction])}>
                       {props.comment && <span>{props.comment.length }</span>}
                      <i class="bi bi-chat-right-dots"></i>
                    </div>
                    <div onClick={()=>HndelLikes(props.postId)}>
                        <span >{postLikes[0] !== "empty" ?postLikes.length:props.postLikes.length}</span>
                        <i style={{color:postLikes.find((ele)=> ele === userId) !== undefined && "#007bff"}} class="bi bi-hand-thumbs-up-fill"></i>
                    </div> 
                </div>
            </div> 
          
        </div>
  )
}





