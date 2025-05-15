import { createContext, useState } from "react";


export const Update= createContext()

export default function UpdateUsers({children}){
   const [IsOpen,setIsoOpen] = useState(false)
    return <Update.Provider value={{IsOpen,setIsoOpen}}>{children}</Update.Provider>
}