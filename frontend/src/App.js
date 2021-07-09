import Navbar from './Navbar';
import Home from './Home';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import AdminHome from './Admin/AdminHome';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [id, setId] = useState({});

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar id={id}/>
        <div className="content">
          <Switch> 
            <Route exact path="/">
              <Home setId={setId} />
            </Route>

            <Route path="/signIn">
              <SignIn setId={setId} />
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route path="/Admin/adminHome">
              <AdminHome id={id} />
            </Route>

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;