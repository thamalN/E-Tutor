import React from 'react'
import { Link, Route } from 'react-router-dom';
import  SidebarData  from './SidebarData.js'

function Sidebar() {
    
    return (
        <Route>
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData().map((val, key) => {
                    return (
                        <li key={ key } id={ window.location.pathname === val.link ? "active" : "" } >   
                            <Link  className="row" to={val.link}>
                                <div  className="row">
                                    <div id="icon">{val.icon}</div>
                                    <div id="title">{val.title}</div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
        </Route>
    );
}

export default Sidebar;
