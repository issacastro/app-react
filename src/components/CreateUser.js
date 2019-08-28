import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
  state = {
    users: [],
    userName: "",
    userBoleta:"",
    userCorreo:"",
    password: ""
  };
   componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const res = await axios.get("https://api-issac.herokuapp.com/api/users");
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
    await axios.post("https://api-issac.herokuapp.com/api/users", {
      userName: this.state.userName,
      password: this.state.password,
      userBoleta: this.state.userBoleta,
      userCorreo: this.state.userCorreo
    });
    this.getUsers();
    this.setState({
      userName: "",
      userBoleta:"",
      userCorreo:"",
      password: ""
    });
  };
   deleteUser= async (id)=>{
   //await axios.delete("https://api-issac.herokuapp.com/api/users/"+id);
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
                    placeholder="Nombre Completo"
                    className="form-control"
                    autoComplete="username"
                    onChange={this.handleInputChange}
                    value={this.state.userName}
                    pattern="|^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$|"
                    title="Nombre invalido"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="userBoleta"
                    placeholder="Boleta"
                    className="form-control"
                    autoComplete="username"
                    onChange={this.handleInputChange}
                    value={this.state.userBoleta}
                    pattern="/^[0-9]{10}$/"
                    title="Boleta invalida"
                  />
                </div>                <div className="form-group">
                  <input
                    type="text"
                    name="userCorreo"
                    type ="email"
                    placeholder="Correo"
                    className="form-control"
                    autoComplete="username"
                    onChange={this.handleInputChange}
                    value={this.state.userCorreo}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="form-control"
                    autoComplete="current-password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-7 text-center">
        Usuarios Registrados
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                //onDoubleClick={()=>this.deleteUser(user._id)}
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
