import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
// import { Icon, InlineIcon } from '@iconify/react';
// import searchOutlined from '@iconify-icons/ant-design/search-outlined';
import SearchIcon from '@material-ui/icons/Search';
// import dropdownIcon from '@iconify-icons/ls/dropdown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import filterIcon from '@iconify-icons/codicon/filter';
import SearchResults from "../SearchResults";

const Students = () => {
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
            user: 1,
            search_string: ""
        }
    );
    var ch = document.querySelectorAll('input[type=checkbox][name=prov]')

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
        var variable = { ...data }
        variable.province = [...province_array]
        variable.grade = [...grade_array]
        setData(variable)
        console.log(data.province);
        console.log(data.grade);


        const url = "https://etutor-backend.herokuapp.com/searchStudent"

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
                if (data.length === 0) {
                    alert("Sorry no match found for your search!")
                    setShowResults(false);
                }
                else {
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
                <form onSubmit={handleSubmit} className="searchForm">
                    <h1 className="stuRegHeader">Search Students</h1>

                    <span>Search multiple keywords separated by |</span>
                    <div className="searchRow mb-4">

                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            placeholder="Search"
                            onChange={(e) => setData({ ...data, search_string: e.target.value })}
                        />
                        <button type="submit">
                            <SearchIcon />
                        </button>
                    </div>

                    <div className="filterRow my-4">
                        <div>
                            <h6>Filter by: </h6>
                            {/* <Icon icon={filterIcon} /> */}
                        </div>
                        <button type="filter button dropdown-toggle" className="btn btn-outline-dark" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Province</h6>
                            <ArrowDropDownIcon />
                        </button>
                        <ul className="dropdown-menu" id="province" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Western" name="prov" id="western" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Central" name="prov" id="central" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Southern" name="prov" id="southern" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Southern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Uva" name="prov" id="uva" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Uva
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Sabaragamuwa" name="prov" id="sabaragamuwa" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Sabaragamuwa
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="North Western" name="prov" id="northwestern" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        North Western
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="North Central" name="prov" id="northcentral" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        North Central
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Nothern" name="prov" id="nothern" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Nothern
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="Eastern" name="prov" id="eastern" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        Eastern
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="filter button dropdown-toggle" className="btn btn-outline-dark" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Gender</h6>
                            <ArrowDropDownIcon />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" onChange={(e) => setData({ ...data, gender: e.target.value })} >
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="radio" name="flexRadioDefault" value="all" id="flexRadioDefault1" />
                                    <label className="form-check-label" style={{ flex: "80%" }} style={{ flex: "80%" }} htmlFor="flexRadioDefault1">
                                        All
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="radio" name="flexRadioDefault" value="male" id="flexRadioDefault2" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexRadioDefault2">
                                        Male
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="radio" name="flexRadioDefault" value="female" id="flexRadioDefault3" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexRadioDefault3">
                                        Female
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <button type="button dropdown-toggle" className="btn btn-outline-dark" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                            <h6>Grade</h6>
                            <ArrowDropDownIcon />
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="2021 O/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        2021 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="2022 O/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        2022 O/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="2021 A/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        2021 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="2022 A/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        2022 A/Level
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input style={{ flex: "20%" }} type="checkbox" value="2023 A/Level" name="grd" id="flexCheckDefault" />
                                    <label className="form-check-label" style={{ flex: "80%" }} htmlFor="flexCheckDefault">
                                        2023 A/Level
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>


                    <ul className="addFields my-4">
                        <details>
                            <summary>
                                <li>
                                    <h5>Enhance Search</h5>
                                </li>
                            </summary>
                            <li>
                                <button onClick={(e) => setData({ ...data, fname: !data.fname })} value="" type="button" className={data.fname === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>First Name</h6>
                                    { /* <Icon icon={plusIcon} /> */}
                                </button>
                                <button onClick={(e) => setData({ ...data, lname: !data.lname })} type="button" className={data.lname === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Last Name</h6>
                                    { /* <Icon icon={plusIcon} /> */}
                                </button>
                                <button onClick={(e) => setData({ ...data, username: !data.username })} type="button" className={data.username === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Username</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                            </li>


                            <li>
                                <button onClick={(e) => setData({ ...data, street_no: !data.street_no })} type="button" className={data.street_no === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Street No.</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                                <button onClick={(e) => setData({ ...data, street: !data.street })} type="button" className={data.street === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Street Name</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                                <button onClick={(e) => setData({ ...data, city: !data.city })} type="button" className={data.city === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>City</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                            </li>
                            <li>
                                <button onClick={(e) => setData({ ...data, email: !data.email })} type="button" className={data.email === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Email</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                                <button onClick={(e) => setData({ ...data, contact: !data.contact })} type="button" className={data.contact === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Contact</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                                <button onClick={(e) => setData({ ...data, birthday: !data.birthday })} type="button" className={data.birthday === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Birthday</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                            </li>
                            <li>

                                <button onClick={(e) => setData({ ...data, school: !data.school })} type="button" id="school" className={data.school === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>School</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>
                                <button onClick={(e) => setData({ ...data, guardian: !data.guardian })} type="button" id="guardian" className={data.guardian === true ? "btn btn-outline-dark newbutton" : "btn btn-outline-dark"}>
                                    <h6>Guardian's Contact</h6>
                                     { /* <Icon icon={plusIcon} /> */} 
                                </button>

                            </li>
                        </details>
                    </ul>


                </form>
                {showResults && <SearchResults results={searchRes} />}
            </div>
        </div>
    );
}

export default Students;