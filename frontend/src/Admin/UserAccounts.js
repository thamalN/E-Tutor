import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { Icon, InlineIcon } from '@iconify/react';
import plusIcon from '@iconify-icons/akar-icons/plus';
import searchOutlined from '@iconify-icons/ant-design/search-outlined';
import dropdownIcon from '@iconify-icons/ls/dropdown';
import filterIcon from '@iconify-icons/codicon/filter';


const UserAccounts = () => {
    const history = useHistory()

    const [id, setId] = useState(null);

    const [data, setData] = useState(
        {
            firstname: "",
            lastname: "",
            street_no: "",
            street: "",
            city: "",
            province: "",
            email: "",
            contact: "",
            birthday: "",
            gender: "",
            username: "",
            password: "",
            school: "",
            grade: "",
            guardian_contact: "",
            user: ""
        }
    );

    useEffect(() => {
        if (document.getElementById("user").value == 4) {
            document.getElementById("dropdownMenuButton3").style.display = "block";
            document.getElementById("guardian").style.display = "block";
            document.getElementById("school").style.display = "block";
            document.getElementById("nic").style.display = "none";

        } else if (document.getElementById("user").value == 3) {
            document.getElementById("dropdownMenuButton3").style.display = "none";
            document.getElementById("guardian").style.display = "none";
            document.getElementById("school").style.display = "block";
            document.getElementById("nic").style.display = "block";
        }
        else if (document.getElementById("user").value == 2) {
            document.getElementById("dropdownMenuButton3").style.display = "none"
            document.getElementById("guardian").style.display = "none";
            document.getElementById("school").style.display = "none";
            document.getElementById("nic").style.display = "block";
        }
        else {
            document.getElementById("dropdownMenuButton3").style.display = "none";
            document.getElementById("guardian").style.display = "none";
            document.getElementById("school").style.display = "none";
            document.getElementById("nic").style.display = "none";
        }
    })

    const handleClick = (e) => {
        console.log(e.target);
    }
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <form className="searchForm">
                    <h1 className="stuRegHeader">Search Users</h1>
                    <div className="searchRow mb-4">
                        <select
                            id="user"
                            placeholder="Choose..."
                            className="userColumn form-select text-center"
                            onChange={(e) => setData({ ...data, user: e.target.value })}
                            required
                        >
                            <option value="all">All Users</option>
                            <option value="4">Students</option>
                            <option value="3">Teachers</option>
                            <option value="2">Staff</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            placeholder="Search"
                        />
                        <button>
                            <Icon icon={searchOutlined} />
                        </button>
                    </div>
                    {/* <div className="searchBar">
                        <select
                            id="user"
                            placeholder="Choose..."
                            onChange={(e) => setData({ ...data, user: e.target.value })}
                            required
                        >
                            <option value="all">All</option>
                            <option value="4">Students</option>
                            <option value="3">Teachers</option>
                            <option value="2">Staff</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            placeholder="Search"
                        />
                        <button>
                            <Icon icon={searchOutlined} />
                        </button>
                    </div> */}

                    <div className="filterRow my-4">
                        <div>
                            <h8>Filter by: </h8>
                            <Icon icon={filterIcon} />
                        </div>
                        <button type="filter button dropdown-toggle" className="btn btn-outline-dark" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Province</h6>
                            <Icon icon={dropdownIcon} />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        All
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Southern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Uva
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Sabaragamuwa
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        North Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        North Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Nothern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Eastern
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="filter button dropdown-toggle" class="btn btn-outline-dark" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Gender</h6>
                            <Icon icon={dropdownIcon} />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        All
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Male
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" for="flexRadioDefault3">
                                        Female
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="button dropdown-toggle" class="btn btn-outline-dark" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Grade</h6>
                            <Icon icon={dropdownIcon} />
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        All
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2021 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2022 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2021 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2022 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2023 A/Level
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <ul className="addFields my-4">
                        <li>
                            <h5>Enhance Search</h5>
                        </li>
                        <li>
                            <button onClick={(e) => setData({ ...data, user: 1 })} value="" type="button" class="btn btn-outline-dark">
                                <h6>First Name</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Last Name</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Username</h6>
                                <Icon icon={plusIcon} />
                            </button>
                        </li>
                        
                        <li>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Street No.</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Street Name</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>City</h6>
                                <Icon icon={plusIcon} />
                            </button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Email</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Contact</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Birthday</h6>
                                <Icon icon={plusIcon} />
                            </button>
                        </li>
                        <li>

                            <button type="button" id="school" class="btn btn-outline-dark">
                                <h6>School</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" id="guardian" class="btn btn-outline-dark">
                                <h6>Guardian's Contact</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" id="nic" class="btn btn-outline-dark">
                                <h6>NIC</h6>
                                <Icon icon={plusIcon} />
                            </button>
                        </li>
                    </ul>


                </form>
            </div>
        </div>

    );
}

export default UserAccounts;