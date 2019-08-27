import React, { Component } from 'react'
import axios from 'axios';

export default class CreateNote extends Component {

constructor(props){
  super(props);
  const data = JSON.parse( localStorage.getItem('note'));
  localStorage.clear();
  if (data===null) {
    this.state ={
      title:'',
      description:'',
      author:'',
      note:[],
      stateedit:false,
      message: 'ADD TASK'
  }
  } else {
    this.state={
      title:data.title,
      description:data.description,
      author:data.author,
      note : data,
      stateedit:true,
      message: 'CHANGE TASK'
    };
  }
}
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
        const note = {
          title: this.state.title,
          description: this.state.description,
          author: this.state.author
        }
        this.state.stateedit ? await axios.put("https://api-issac.herokuapp.com/api/notes/"+this.state.note._id, note) :await axios.post("https://api-issac.herokuapp.com/api/notes", note);
        this.setState({
            title:'',
            description:'',
            author:''
        });
        this.props.history.push('/');
      };
    render() {
        return (
            <div className="col-md-6 offset-md-3 p-3">
            <div className="card">
              <div className="card-body">
              <legend className="text-center">Publicar</legend>
                <form onSubmit={this.onSubmit} >
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Titulo"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.title}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="description"
                      cols="80"
                      className="form-control"
                      placeholder="Comentario"
                      onChange={this.handleInputChange}
                      value={this.state.description}
                    ></textarea>
                  </div>
                  <button  type="submit" className="btn btn-success btn-block">
                    {this.state.message}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}
