import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteUser } from "@/models/lib/db/services/users";
import Swal from "sweetalert2";

const DeleteUser = () => {
  const [id, SetId] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { token, setToken } = useContext(AuthContext);

  const DeleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/users/deleteUser/${id}`)
      .then((res) => {
        setMsg("ID is correct and the user has been deleted successfully");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        console.log("res", res);
        setSuccess(true);
        Swal.fire({
          title: "the User Deleted!",
          text: "The User has been deleted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          location.reload();
        });

        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        setMsg("Can't Delete a User");
        setSuccess(false);
        setTimeout(() => {
          setMsg("");
        }, 3000);
        console.log(err);
      });
  };
  console.log(id);

  const getUsers = () => {
    axios
      .get(`http://localhost:3000/api/users/allUsers`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="deletePostDiv">
      <p className="introDelete">Select a User that you want to delete it.</p>
      <select
        className="form-select"
        multiple
        aria-label="multiple select example"
      >
        {users.map((ele) => (
          <option
            key={ele.id}
            onClick={() => {
              {
                console.log(ele);
              }

              SetId(ele.id);
            }}
            value={ele.id}
          >
            {ele.firstname} {ele.lastname}
          </option>
        ))}
      </select>

      <button
        className="btnDelete"
        type="button"
        class="btn btn-light btn-md"
        onClick={(e) => {
          DeleteUser();
        }}
      >
        Delete an appointment
      </button>
      {msg && (
        <div>
          {" "}
          <p className="msgDeleted">{msg}</p>
        </div>
      )}
    </div>
  );
};
export default DeleteUser;
