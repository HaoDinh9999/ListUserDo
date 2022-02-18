import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/editUser.css";
export default class EditUser extends Component {
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
      id: this.props.match.params.id,
      error: false,
      textError: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/users/getUserId/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          username: res.data.user.username,
          email: res.data.user.email,
          birthdate: new Date(res.data.user.birthdate),
          error: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
          error: true,
          textError: error,
        });
      });
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
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     error: false,
  //   });
  //   const user = {
  //     username: this.state.username,
  //     email: this.state.email,
  //     birthdate: this.state.birthdate,
  //   };
  //   try {
  //     const res = await axios({
  //       method: "POST",
  //       url:
  //         "http://localhost:5000/api/users/update/" +
  //         this.props.match.params.id,
  //       data: user,
  //     });
  //     console.log(res);
  //     //    res.data && window.location.replace("/login");
  //   } catch (err) {
  //     //  setTextError(err.response.data.message);
  //     console.log(err.response);
  //   }
  // };

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      birthdate: this.state.birthdate,
    };

    console.log(user);

    axios
      .post(
        "http://localhost:5000/api/users/update/" + this.props.match.params.id,
        user
      )
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
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>Edit user</h3>
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
