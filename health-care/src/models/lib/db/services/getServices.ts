import pool from "../index"

export const getAllService= async ()=>{
    const result= await pool.query("SELECT services.title, services.description, services.imageurl, blogs.body, users.firstname, users.lastname FROM services INNER JOIN blogs ON services.blog_id = blogs.id INNER JOIN users ON services.doctor_id = users.id")
    return result.rows
} 