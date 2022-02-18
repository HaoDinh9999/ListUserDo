import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.email}</td>
    <td>{props.user.birthdate.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>edit</Link> |{" "}
      {/* <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
    </a> */}
    </td>
  </tr>
);

export default function UserList() {
  const [users, setUsers] = useState([
    { username: "hào", email: "a@gmail.com", birthdate: "15/09", _id: "1" },
    { username: "tien", email: "b@gmail.com", birthdate: "15/09", _id: "1" },
  ]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.users);
      // console.log(res.data.users);
    };
    fetchUsers();
  }, []);
  const handleGetAll = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users`);
      setUsers(res.data.users);
      // console.log(res.data.users);
    } catch (err) {
      console.log(1233333333 + err);
    }
  };
  const handleGetBySearch = async (e) => {
    e.preventDefault();
    console.log(search);

    try {
      if (!search) {
        console.log("m da vo hay chua");
        const res = await axios({
          method: "GET",
          url: `http://localhost:5000/api/users`,
        });
        setUsers(res.data.users);
      } else {
        const res = await axios({
          method: "GET",
          url: `http://localhost:5000/api/users/${search}`,
        });
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log("get by search" + err.message);
    }
  };
  const userList = () => {
    handleGetAll();
    return users.map((currentUser) => {
      return (
        <Users
          user={currentUser}
          //  deleteExercise={this.deleteExercise}
          key={currentUser._id}
        />
      );
    });
  };
  //   deleteExercise(id) {
  //     axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
  //       console.log(response.data);
  //     });

  //     this.setState({
  //       exercises: this.state.exercises.filter((el) => el._id !== id),
  //     });
  //   }

  return (
    <div style={{ padding: "10px 10px" }}>
      <h3>List Users*</h3>
      {/* Add and Search */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a
          href="/create"
          className="btn btn-light my-sm-0"
          style={{ background: "#007bff", color: "#fff" }}
        >
          Add user
        </a>
        <form
          className="form-line"
          style={{ display: "flex" }}
          onSubmit={handleGetBySearch}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search name or email"
            aria-label="Search"
            onChange={(e) => {
              if (!e.target.value) setSearch("");
              setSearch(e.target.value);
            }}
          />
          <button
            className="btn btn-light my-sm-0"
            type="submit"
            style={{ background: "#007bff", color: "#fff" }}
          >
            Search
          </button>
        </form>
      </div>
      {/* Table */}

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Birthdate</th>
            <th>Options</th>
          </tr>
        </thead>
        {/* {(handleGetAll(), console.log(users))} */}
        {users.map((user) => {
          console.log(user);
          return <Users user={user} />;
        })}
      </table>
    </div>
  );
}
