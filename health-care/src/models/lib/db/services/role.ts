
import pool from "../index"

 export type POSTAddrole= {
    role_name: string;
}

export const addRole= async (
    newRole: POSTAddrole
)=>{
    const result = await pool.query<POSTAddrole>("INSERT INTO ROLE (role_name) values($1) returning * ",[newRole.role_name] )

return result.rows
}

