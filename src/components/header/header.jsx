import { Link } from "react-router-dom"
import "./header.css"
import { useEffect, useState } from "react"
import axios from "axios"
import swal from 'sweetalert';
import Cookies from "js-cookie"
const profileImage = require("../../images/user-avatar.png")
export default  function Header (){
    let [search,setsearch] = useState("gh")
    let [data,setdata] = useState([])
    const[render,setRender] = useState(1)
    const [currUser,setCurrUser] = useState({
        avatar:{url:""}})
    let [isOPen,setisOPen] = useState(false)
    const Token = Cookies.get("userToken")
    useEffect(()=>{
               axios.get("https://facebookclone-production.up.railway.app/api/users/search?name="+search,{headers:{
                Authorization:"bearer " + Token
               }}
               ).then((ele)=>{
                   setdata(ele.data.users)
             if(search.length <= 0)
                setisOPen(false)
                else if(ele.data.users.length > 0)
                setisOPen(true)
            else
            setisOPen(false)
               }).catch((err)=>{
                console.log(err)
               })
    },[search.length])

    useEffect(()=>{
axios.get("https://facebookclone-production.up.railway.app/api/users/getuser",{headers:{
                Authorization:"bearer " + Token
               }}
               ).then((res)=>{
                setCurrUser(res.data.data.currentUser[0])

               }).catch((err)=>{
                setCurrUser("")
                swal("You must log in or register to continue.");
               })
    },[render])
    const searcRes = data.map((ele)=>{
         return (
             <Link to={`/${ele._id}`}>
                <div className="user">
                    < img src={`${ele.avatar.url}`}/>
                  <div>
                    <span>{ele.username}</span>
                    {ele.isAcountVerified&&<i style={{fontSize:"15px"}} className="bi bi-patch-check-fill verified-icon"></i>}
                    </div> 
             </div>
             </Link>
         )
    })
    function logout(){
        console.log("logout")
        Cookies.remove("userToken")
        Cookies.remove("userId")
        setRender(render + 1)
    }

    return(
        <div class="header">
    <div class="logo">
        <a style={{display:"flex",alignItems:"center",justifyContent:"center",marginRight:"2px",marginTop:"2px"}} href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" /></a>
    </div>


    <div class="search-bar">
        <input  onChange={(ele)=>{
            setsearch(ele.target.value)
        }} type="text" placeholder="search" />
        <button><i class="bi bi-search"></i></button>
       {isOPen&& <div className="search-res">
            <div className="close">
            <i class="close bi bi-x-circle-fill" onClick={()=>setisOPen(false)}></i>
             </div> 
              {searcRes}
        </div>}
    </div>


    {currUser !== "" ?<div class="icons">
        <Link to="/"><div class="icon-item"><i class="bi bi-house-door"></i> <span>Home</span></div></Link>
       {currUser.isAdmin && <Link to="producted"> <div class="icon-item"><i class="bi bi-bar-chart-fill"></i> <span>dashBoard</span></div></Link>}
        

     
        <div class="profile-dropdown icon-item">
            <img src={currUser.avatar.url || ""} alt="Profile Picture" />
            <div class="dropdown-menu">
                <Link to={"profile"}>profile</Link>
               
                <Link to={"/"} onClick={logout} >logout</Link>
            </div>
        </div>
    </div>:<Link to={"/login"}><div class="login-container">
    <button class="login-button" >Login</button>
  </div></Link>
}
</div>
    )
}