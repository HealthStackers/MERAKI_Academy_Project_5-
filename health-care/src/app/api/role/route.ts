import {addRole} from "@/models/lib/db/services/role"
import { request } from "http"
import { NextResponse } from "next/server"


export const POST = async(request: Request) =>{
   try {
     const body= await request.json() 
    const result= await addRole(body)
    console.log("body: ", body);
    
    return NextResponse.json({Data:result, message: "Role has been added successfully"}, {status:201})
   } catch (error) {

    return NextResponse.json({Data:error, message: "Error in adding the role"}, {status:501})
    
   }
}
