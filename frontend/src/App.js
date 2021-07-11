import Navbar from './Navbar';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AdminHome from './Admin/AdminHome';
import Home from './Home';
import CreateAnnouncement from './Admin/CreateAnnouncement';
import CreateTeacherAcc from './Admin/CreateTeacherAcc';
import TeacherHome from './Teacher/TeacherHome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';


import './Resources/styles.css'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
        <Navbar loggedIn = { loggedIn } setLoggedIn = { setLoggedIn }/>

        <div className="content">
          <Switch> 
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/signIn">
              <SignIn setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route exact path="/adminHome">
              <AdminHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route path="/Teacher/teacherHome">
              <TeacherHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/adminHome/createTeacherAcc">
              <CreateTeacherAcc />
            </Route>

            <Route exact path="/createAnnouncement">
              <CreateAnnouncement />
            </Route>

          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;