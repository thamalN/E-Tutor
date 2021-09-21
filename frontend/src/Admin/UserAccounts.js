import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { Icon, InlineIcon } from '@iconify/react';
import plusIcon from '@iconify-icons/akar-icons/plus';
import searchOutlined from '@iconify-icons/ant-design/search-outlined';
// import dropdownIcon from '@iconify-icons/ls/dropdown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import filterIcon from '@iconify-icons/codicon/filter';
import SearchResults from "../SearchResults";


const UserAccounts = () => {
    const history = useHistory()

    const [searchRes, setSearchRes] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const [data, setData] = useState(
        {
            fname: false,
            lname: false,
            street_no: false,
            street: false,
            city: false,
            province: [],
            email: false,
            contact: false,
            birthday: false,
            gender: "",
            username: false,
            school: false,
            grade: [],
            guardian_contact: false,
            nic: false,
            user: 1,
            search_string:""
        }
    );
    var ch = document.querySelectorAll('input[type=checkbox][name=prov]')
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

    useEffect(() => {
        if (document.getElementById("user").value == 4) {

        }
    })

    var province_array = []
    var grade_array = []
        
    console.log(data.gender);

    const handleSubmit = (e) => {
        e.preventDefault();

        var checkboxes1 = document.querySelectorAll('input[type=checkbox][name=prov]:checked')
        var checkboxes2 = document.querySelectorAll('input[type=checkbox][name=grd]:checked')
        for (var i = 0; i < checkboxes1.length; i++) {
            province_array.push(checkboxes1[i].value)
        }

       
        for (var i = 0; i < checkboxes2.length; i++) {
            grade_array.push(checkboxes2[i].value)
        }
        var variable = {...data}
        variable.province = [...province_array]
        variable.grade = [...grade_array]
        setData(variable)
        console.log(data.province);
        console.log(data.grade);


        const url = "http://localhost:3001/searchUser"

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(variable)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if(data.length===0){
                    alert("Sorry no match found for your search!")
                }
                else{
                setSearchRes(data);
                setShowResults(true);
                document.getElementById("search-results").scrollIntoView()
                }
            })
    }
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <form onSubmit= {handleSubmit} className="searchForm">
                    <h1 className="stuRegHeader">Search Users</h1>
                    <span>Search multiple keywords separated by |</span>
                    <div className="searchRow mb-4">
                        <select
                            id="user"
                            placeholder="Choose..."
                            className="userColumn form-select text-center"
                            onChange={(e) => setData({ ...data, user: e.target.value })}
                            required
                        >
                            <option value="1">All Users</option>
                            <option value="4">Students</option>
                            <option value="3">Teachers</option>
                            <option value="2">Staff</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            placeholder="Search"
                            onChange={(e) => setData({ ...data, search_string: e.target.value })}
                        />
                        <button type="submit">
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
                            {/* <Icon icon={filterIcon} /> */}
                        </div>
                        <button type="filter button dropdown-toggle" className="btn btn-outline-dark" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Province</h6>
                            <ArrowDropDownIcon />
                        </button>
                        <ul className="dropdown-menu" id="province" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Western" name="prov" id="western" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Central" name="prov" id="central" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Southern" name="prov" id="southern" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Southern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Uva" name="prov" id="uva" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Uva
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Sabaragamuwa" name="prov" id="sabaragamuwa" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Sabaragamuwa
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="North Western" name="prov" id="northwestern" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        North Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="North Central" name="prov" id="northcentral" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        North Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Nothern" name="prov" id="nothern" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Nothern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Eastern" name="prov" id="eastern" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Eastern
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="filter button dropdown-toggle" class="btn btn-outline-dark" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Gender</h6>
                            <ArrowDropDownIcon />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" onChange={(e) => setData({ ...data, gender: e.target.value })} >
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="all" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        All
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="male" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Male
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value="female" id="flexRadioDefault3" />
                                    <label className="form-check-label" for="flexRadioDefault3">
                                        Female
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="button dropdown-toggle" class="btn btn-outline-dark" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Grade</h6>
                            <ArrowDropDownIcon />
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="2021 O/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2021 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="2022 O/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2022 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="2021 A/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2021 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="2022 A/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        2022 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="2023 A/Level" name="grd" id="flexCheckDefault" />
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
                            <button onClick={(e) => setData({ ...data, fname: !data.fname })} value="" type="button" class= {data.fname===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>First Name</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, lname: !data.lname })}type="button" class={data.lname===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Last Name</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, username: !data.username })} type="button" class={data.username===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Username</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                        </li>
                        
                        <li>
                            <button onClick={(e) => setData({ ...data, street_no: !data.street_no })} type="button" class={data.street_no===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Street No.</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, street: !data.street })} type="button" class={data.street===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Street Name</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, city: !data.city })} type="button" class={data.city===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>City</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => setData({ ...data, email: !data.email })} type="button" class={data.email===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Email</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, contact: !data.contact })} type="button" class={data.contact===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Contact</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, birthday: !data.birthday })} type="button" class={data.birthday===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Birthday</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                        </li>
                        <li>

                            <button onClick={(e) => setData({ ...data, school: !data.school })} type="button" id="school" class={data.school===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>School</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, guardian: !data.guardian })} type="button" id="guardian" class={data.guardian===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>Guardian's Contact</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                            <button onClick={(e) => setData({ ...data, nic: !data.nic })} type="button" id="nic" class={data.nic===true ? "btn btn-outline-dark newbutton":"btn btn-outline-dark"}>
                                <h6>NIC</h6>
                                {/* <Icon icon={plusIcon} /> */}
                            </button>
                        </li>
                    </ul>


                </form>
               {showResults && <SearchResults results={searchRes}/>}
            </div>
        </div>

    );
}

export default UserAccounts;