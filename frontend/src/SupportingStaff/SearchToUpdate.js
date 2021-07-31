import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';
import './staffhome.css';
import { Icon, InlineIcon } from '@iconify/react';
import plusIcon from '@iconify-icons/akar-icons/plus';
import searchOutlined from '@iconify-icons/ant-design/search-outlined';
import dropdownIcon from '@iconify-icons/ls/dropdown';


const SearchToUpdate = () => {
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
            guardian_contact: ""
        }
    );

    const handleClick = (e) => {
        console.log(e.target);
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <form className="searchForm">
                    <h1 className="stuRegHeader">Update/ Delete</h1>
                    <ul className="addFields">
                        <li>
                            <h5>Add Fields to Search</h5>
                        </li>
                        <li>
                            <button onClick={(e) => handleClick(e)} value="" type="button" class="btn btn-outline-dark">
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
                                <h6>School</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Grade</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Guardian's Contact</h6>
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
                            <button type="button dropdown-toggle" class="btn btn-outline-dark" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Email</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Contact</h6>
                                <Icon icon={plusIcon} />
                            </button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-outline-dark">
                                <h6>Birthday</h6>
                                <Icon icon={plusIcon} />
                            </button>
                            <button type="button dropdown-toggle" class="btn btn-outline-dark" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
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
                        </li>
                    </ul>
                    {/* <div className="col-md-6">
                        <label htmlFor="firstName" className="mt-2">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="mt-2">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="userName" className="mt-2">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="school" >School</label>
                        <input
                            type="text"
                            className="form-control"
                            id="school"
                            value={data.school}
                            onChange={(e) => setData({ ...data, school: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="grade" >Grade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="grade"
                            value={data.grade}
                            onChange={(e) => setData({ ...data, grade: e.target.value })}
                        />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="guardianContact" className="mt-2">Guardian's Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="guardianContact"
                            value={data.guardian_contact}
                            onChange={(e) => setData({ ...data, guardian_contact: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="streetNo">Street No</label>
                        <input
                            type="text"
                            className="form-control"
                            id="streetNo"
                            value={data.street_no}
                            onChange={(e) => setData({ ...data, street_no: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="streetName">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            id="streetName"
                            value={data.street}
                            onChange={(e) => setData({ ...data, street: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="city">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={data.city}
                            onChange={(e) => setData({ ...data, city: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="province">Province</label>
                        <select
                            className="form-select"
                            id="province"
                            value={data.province}
                            onChange={(e) => setData({ ...data, province: e.target.value })}
                        >
                            <option value="" disabled defaultValue hidden>Choose...</option>
                            <option>Western</option>
                            <option>Central</option>
                            <option>Southern</option>
                            <option>Uva</option>
                            <option>Sabaragamuwa</option>
                            <option>North Western</option>
                            <option>North Central</option>
                            <option>Nothern</option>
                            <option>Eastern</option>
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            value={data.contact}
                            onChange={(e) => setData({ ...data, contact: e.target.value })}
                        />
                    </div>


                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="birthday">Birthday</label>
                        <input type="date"
                            value={data.birthday}
                            className="form-control"
                            id="birthday"
                            onChange={(e) => setData({ ...data, birthday: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="mt-2" htmlFor="gender">Gender</label>
                        <select
                            className="form-select"
                            id="gender"
                            value={data.gender}
                            onChange={(e) => setData({ ...data, gender: e.target.value })}
                        >
                            <option value="" disabled defaultValue hidden>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div> */}
                    <div className="searchbar">
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
                    {/* 
                    <div className="col-12 mt-4">
                        <input type="submit" className="w-100 btn btn-lg btn-dark" value="Search" />
                    </div> */}
                </form>
                <div className="b2">

                    <ul>
                        <li className="reg_title">
                            <h3>Search Results</h3>
                        </li>
                        <li className="reg_table">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Registered Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Contact</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">2501</th>
                                        <td>14/07/2021</td>
                                        <td align="left">Nuvinda Chandrakumara</td>
                                        <td>0727787778</td>
                                        <td><button className="btn btn-dark">Update</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2500</th>
                                        <td>13/07/2021</td>
                                        <td align="left">Thamal Nanayakkara</td>
                                        <td>0123212234</td>
                                        <td><button className="btn btn-dark">Update</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2499</th>
                                        <td>13/07/2021</td>
                                        <td align="left">Mary Watson</td>
                                        <td>0123212234</td>
                                        <td><button className="btn btn-dark">Update</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2498</th>
                                        <td>13/07/2021</td>
                                        <td align="left">Niklaus Mikaelson</td>
                                        <td>0123212234</td>
                                        <td><button className="btn btn-dark">Update</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2497</th>
                                        <td>12/07/2021</td>
                                        <td align="left">Malinda Malith</td>
                                        <td>0123212234</td>
                                        <td><button className="btn btn-dark">Update</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchToUpdate;