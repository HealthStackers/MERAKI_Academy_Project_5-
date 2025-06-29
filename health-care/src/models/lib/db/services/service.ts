import pool from "../index";

export type service = {
  title: string;
  description: string;
  imageurl: string;
  doctor_id: number;
};

export const AddService = async (service: service) => {
  const result = await pool.query<service>(
    "INSERT INTO services (title , description , imageurl ,doctor_id  ) VALUES ($1 , $2 , $3 , $4) RETURNING *",
    [service.title, service.description, service.imageurl, service.doctor_id]
  );
  return result.rows;
};

export const getAllService = async () => {
  const result = await pool.query(`SELECT * FROM services`);
  return result.rows;
};

export const getCountServicesForDoctor = async (id :number) => {
  const result =
    await pool.query(`SELECT  s.doctor_id, count(s.id) as Doctor_services  FROM services AS s WHERE doctor_id = $1 GROUP BY doctor_id 
` , [id]);
  return result.rows;
};

export const getAllServicesWithBlogs = async () => {
  const result = await pool.query(
    "SELECT services.id as service_id , services.title as service_title, services.description, services.imageurl, blogs.title as blog_title, blogs.id  as blog_id, blogs.body, users.firstname, users.lastname , users.country , users.email , blogs.timecreated FROM  services INNER JOIN blogs ON blogs.service_id = services.id INNER JOIN users ON services.doctor_id = users.id"
  );

  return result.rows;
};

export const getAllServicesWithBlogsById = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM services INNER JOIN blogs ON blogs.service_id = services.id INNER JOIN users ON services.doctor_id = users.id WHERE services.id = $1",
    [id]
  );

  return result.rows;
};
// export const getAllService = async () => {
//   const result = await pool.query(
//     "SELECT services.title, services.description, services.imageurl, blogs.body, users.firstname, users.lastname FROM services INNER JOIN blogs ON blogs.service_id = services.id INNER JOIN users ON services.doctor_id = users.id"
//   );
//   console.log("result: ", result);
//}




