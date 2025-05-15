import { createContext, useState } from "react";


export const Comments= createContext()

export default function ShowComm({children}){
   const [IsOpen,setIsoOpen] = useState([])
    return <Comments.Provider value={{IsOpen,setIsoOpen}}>{children}</Comments.Provider>
}