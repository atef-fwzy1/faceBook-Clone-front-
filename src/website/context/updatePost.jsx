import { createContext, useState } from "react";


export const Post= createContext()

export default function UpdatePost({children}){
   const [IsOpen,setIsoOpen] = useState(false)
    return <Post.Provider value={{IsOpen,setIsoOpen}}>{children}</Post.Provider>
}