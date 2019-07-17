import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Navigation from './components/Navigation';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser'
import Notes from './components/NotesList';

function App() {
  return (
 <Router>
   <Navigation/>
    <div className="container p-4">
    <Route path="/" exact component={Notes}/>
   <Route path="/newnote" component={CreateNote}/>
   <Route path="/newuser" component={CreateUser}/>
    </div>
 </Router>
  );
}

export default App;
