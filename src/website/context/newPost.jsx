import { createContext, useState } from "react";


export const AddPost= createContext()

export default function AddNewPost({children}){
   const [IsOpen,setIsoOpen] = useState(false)
    return <AddPost.Provider value={{IsOpen,setIsoOpen}}>{children}</AddPost.Provider>
}