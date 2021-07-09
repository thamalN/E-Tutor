import Navbar from './Navbar';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AdminHome from './Admin/AdminHome';
import Home from './Home';

import CreateTeacherAcc from './Admin/CreateTeacherAcc';
import TeacherHome from './Teacher/TeacherHome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './Resources/styles.css'

function App() {

  return (
    <BrowserRouter>
        <Navbar />
        <div className="content">
          <Switch> 
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/signIn">
              <SignIn />
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route path="/Admin/adminHome">
              <AdminHome />
            </Route>

            <Route path="/Teacher/teacherHome">
              <TeacherHome />
            </Route>

            <Route path="/Admin/createTeacherAcc">
              <CreateTeacherAcc />
            </Route>

          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;