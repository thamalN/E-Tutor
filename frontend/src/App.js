import Navbar from './Navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AdminHome from './AdminHome';
import CreateTeacherAcc from './CreateTeacherAcc';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [id, setId] = useState({});

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              
            </Route>

            <Route path="/signIn">
              <SignIn setId={setId}/>
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route path="/adminHome">
              <AdminHome id={id}/>
            </Route>

            <Route path="/createTeacherAcc">
              <CreateTeacherAcc />
            </Route>

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;