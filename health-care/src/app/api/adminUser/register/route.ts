import {registerAdminUser} from "@/models/lib/db/services/adminUsers"
import {NextResponse} from "next/server"

export const POST= async(request:Request)=>{

try {
        const body= await request.json()
        const result= await registerAdminUser(body)
        return NextResponse.json({data: result, message: "Admin has been added successfully"},{status:201})
} catch (error) {
    console.log(error);
    
    return NextResponse.json({data: error, message: "Error in adding the admin"},{status:501})
}
}
