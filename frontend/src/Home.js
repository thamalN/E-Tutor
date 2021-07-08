// import Navbar from './Navbar';
// import SignIn from './SignIn';
// import SignUp from './SignUp';
// import AdminHome from './AdminHome';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div id="demo" className="carousel slide" data-ride="carousel">

                {/* <!-- Indicators --> */}
                <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ul>

                {/* <!-- The slideshow --> */}
                <div className="vignette">
                    <div className="carousel-inner">
                        <div className="carousel-item active vignette">
                            <img src="slide1.jpg" alt="slide 1" width="100%" height="100%" />
                        </div>
                        <div className="carousel-item">
                            <img src="slide2.jpg" alt="slide 2" width="100%" height="100%" />
                        </div>
                        <div className="carousel-item">
                            <img src="slide3.jpg" alt="slide 3" width="100%" height="100%" />
                        </div>
                    </div>
                </div>

                {/* <!-- Left and right controls --> */}
                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#demo" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>

            </div>
        </div>
    );
}

export default Home;

// function App() {

//   const [id, setId] = useState({});

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Navbar />
//         {/* <div className="content">
//           <Switch>
//             <Route exact path="/">

//             </Route>

//             <Route path="/signIn">
//               <SignIn setId={setId} />
//             </Route>

//             <Route path="/signUp">
//               <SignUp />
//             </Route>

//             <Route path="/adminHome">
//               <AdminHome id={id} />
//             </Route>
//           </Switch>
//         </div> */}
//         <div class="carousel-item">
//   <img src="..." alt="...">
//   <div class="carousel-caption d-none d-md-block">
//     <h5>...</h5>
//     <p>...</p>
//   </div>
// </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

