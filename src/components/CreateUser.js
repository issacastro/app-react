import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
  state = {
    users: [],
    userName: "",
    password: ""
  };
   componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const res = await axios.get("http://170.6.0.29:4000/api/users");
    this.setState({ users: res.data });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  onSubmit = async event => {
    event.preventDefault();
    await axios.post("http://170.6.0.29:4000/api/users", {
      userName: this.state.userName,
      password: this.state.password
    });
    this.getUsers();
    this.setState({
      userName: "",
      password: ""
    });
  };
   deleteUser= async (id)=>{
   await axios.delete("http://170.6.0.29:4000/api/users/"+id);
   this.getUsers();
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    className="form-control"
                    autoComplete="username"
                    onChange={this.handleInputChange}
                    value={this.state.userName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    autoComplete="current-password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Create a User
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={()=>this.deleteUser(user._id)}
              >
                {user.userName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
