import { request } from "http";
import pool from "../index";

type joinAsDoctor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  clinicName: string;
  specialization: string;
  cvUrl: string;
  profilePicture: string;
  status: "pending" | "approved" | "rejected";
  doctorId: number;
};

type status = string

type Updatedstatus= {
    status :string
}



export const POSTJoinAsDoctor = async (newJoinRequest: joinAsDoctor) => {
  const result = await pool.query(
    "insert into join_request (firstname, lastname, email, city, clinicname, specialization, cvurl, profilepictureurl, doctor_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
        newJoinRequest.firstName.toLowerCase(),
        newJoinRequest.lastName.toLowerCase(),
        newJoinRequest.email.toLowerCase(),
        newJoinRequest.city.toLowerCase(),
        newJoinRequest.clinicName.toLowerCase(),
        newJoinRequest.specialization.toLowerCase(),
        newJoinRequest.cvUrl.toLowerCase(),
        newJoinRequest.profilePicture.toLowerCase(),
        newJoinRequest.doctorId
    ]
  );
  return result.rows
};


export const GETRequestByStatus= async (status:status)=>{
    const result= await pool.query("select * from join_request where status= $1",[
        status
    ])
    return result.rows
}


export const PUTUpdateStatusById= async (status:Updatedstatus,id:number)=>{
    const result= await pool.query("update join_request set status=$1 where id=$2 returning *",[
        status.status,
        id
    ])

    return result.rows

}