import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/editUser.css";
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // console.log(`${this.props.match.params.id}`);
    this.state = {
      username: "",
      email: "",
      birthdate: new Date(),
      error: false,
      textError: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      birthdate: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      birthdate: this.state.birthdate,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/api/users/", user)
      .then((res) => {
        console.log(res.data);
        this.setState({
          error: false,
        });
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          error: true,
          textError: err.response.data.message,
        });
        console.log(this.state.error);
      });

    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Create new user
        </h3>
        <form
          onSubmit={this.onSubmit}
          style={{
            padding: "10px 10px",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            margin: "0 auto",
          }}
        >
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form__input"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
            {/* <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select> */}
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              required
              className="form__input"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                //  className="form__input"
                dateFormat="yyyy-MM-d "
                selected={this.state.birthdate}
                onChange={this.onChangeDate}
                selectsStart
              />
            </div>
          </div>
          {this.state.error && (
            <span
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              ! {this.state.textError}
            </span>
          )}
          <div
            className="form-group"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <input
              type="submit"
              value="Submit User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
