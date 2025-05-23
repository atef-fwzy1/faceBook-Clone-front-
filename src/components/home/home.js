import Header from "../header/header";
import axios from "axios";
import Post from "../post/post";
import"./home.css"
import { useContext, useEffect, useState } from "react";
import PostWithComments from "../commentsBody/coments";
import { Comments } from "../../website/context/Comments";
import UpdatePost from "../updatePost/updatepost";
import { Post as postUpdate  } from "../../website/context/updatePost";
import Footer from "../footer/footer";
import Loader from "../loader/Loader";
export default  function Home (){
   const [page,setPage] = useState(1);
   var ShowComm = useContext(Comments)
   const [post,setPost] = useState([]);
   const IsUPdatePost = useContext(postUpdate)
   //useeffect 
  useEffect(()=>{
    axios.get(`https://facebookclone-production.up.railway.app/api/posts?limit=20&page=`+page).then((res)=>{
    if(res.data.post.length === 0)
      setPage(1)
      setPost(res.data.post)
   }).catch((err)=>{
      console.log(err)
   })
  },[page])

         const allPosts =  post.map((ele)=>{
        
               return <Post construction = {ele.construction} profilePicture={ ele.user.avatar.url} username ={ ele.user.username}  text={ele.description} image= {ele.image.url} likes={ele.likes}  isAcountVerified={ele.user.isAcountVerified} postId = {ele._id} comment ={ele.comments} postLikes = {ele.likes}/>
            }).reverse()
        
          
   return (
   <div className="continer" style={{height:ShowComm.IsOpen.length > 0&&"100vh",minHeight: "100vh",position:"relative",overflow:"hidden"}}>
    <Header/>
      <div className="postsBox">
         {allPosts.length > 0?allPosts:<Loader/>}
      </div>
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
      {ShowComm.IsOpen.length > 0 && <PostWithComments/>}
      {IsUPdatePost.IsOpen.length > 0 &&<UpdatePost/>}
      <Footer/>
   </div> 
    )
}