import {getAllService} from "@/models/lib/db/services/getServices"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    try {
        const result= await getAllService()
        
        return NextResponse.json({data:result,message:"All blogs"},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({data:error,message:"Error in getting blogs"},{status:500})
        
    }
}