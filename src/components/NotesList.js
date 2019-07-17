import React, { Component } from "react";
import axios from "axios";
import {format} from 'timeago.js';
export default class NotesList extends Component {
  state = {
    notes: [],
    note: []
  };
  getNotes = async ()=>{
    const res = await axios.get("https://api-issac.herokuapp.com/api/notes");
    this.setState({ notes: res.data });
  }
 componentDidMount() {
    this.getNotes();
  }
  deleteNote = async (id) =>{
    await axios.delete("https://api-issac.herokuapp.com/api/notes/"+id)
    this.getNotes();
  }
  editNote = async (id) =>{
     const res = await axios.get("https://api-issac.herokuapp.com/api/notes/"+id);
     this.setState({ note: res.data });
     localStorage.setItem('note',JSON.stringify(res.data));
     this.props.history.push('/newnote');
  }
  render() {
    return (
      <div className="row">
        {this.state.notes.map(note => (
          <div className="col-md-4 p-4" key={note._id}>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header text-right"><small>{format(note.createdAt)}</small></div>
              <div className="card-body">
                <h4 className="card-title">{note.title}</h4>
                <p className="card-text">{note.description}</p>
              </div>
              <div className="row card-body text-right d-flex justify-content-end">
            <button className="btn btn-outline-success btn-sm mx-1" onClick={()=>this.editNote(note._id)}>Change</button>
            <button className="btn btn-outline-danger btn-sm mx-1" onClick={()=>this.deleteNote(note._id)}>Delete</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
