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

export const getCountServicesForDoctor = async (id: number) => {
  const result = await pool.query(
    `SELECT  s.doctor_id, count(s.id) as Doctor_services  FROM services AS s WHERE doctor_id = $1 GROUP BY doctor_id 
`,
    [id]
  );
  return result.rows;
};

export const getAllServicesWithBlogs = async () => {
  const result = await pool.query(
    `SELECT
  s.id               AS service_id,
  s.title            AS service_title,
  s.description,
  s.imageurl,
  STRING_AGG(CAST(b.id AS VARCHAR), ',') 
    AS blog_ids,
  u.firstname,
  u.lastname,
  u.country,
  u.email
FROM services AS s
INNER JOIN blogs AS b
  ON b.service_id = s.id
INNER JOIN users AS u
  ON s.doctor_id = u.id
GROUP BY
  s.id, s.title, s.description, s.imageurl,
  u.firstname, u.lastname, u.country, u.email;
`
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
