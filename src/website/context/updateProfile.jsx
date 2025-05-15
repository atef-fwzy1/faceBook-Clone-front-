import { createContext, useState } from "react";


export const Update= createContext()

export default function UpdatePops({children}){
   const [IsOpen,setIsoOpen] = useState("")
    return <Update.Provider value={{IsOpen,setIsoOpen}}>{children}</Update.Provider>
}