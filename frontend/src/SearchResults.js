import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const results = props.results;

    return (
        <div className="b2" id="search-results">

            <ul>
                <li className="reg_title">
                    <h3>Search Results</h3>
                </li>
                <li>
                    <table className="table table2">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>

                            {results.map((searchData, i) => (

                                <tr key={i}>
                                    <td>
                                        <Link className="dropdown-item" to={{
                                            pathname: "/viewUser",
                                            state: {
                                                userId: searchData.user_id,
                                                userFlag: searchData.user_flag
                                            }
                                        }}>
                                            {searchData.user_id}
                                        </Link>
                                    </td>

                                    <td>{searchData.fname} {searchData.lname}</td>
                                    <td>{searchData.email}</td>
                                    <td>{searchData.contact}</td>
                                    <td>{searchData.street_no}, {searchData.street}, {searchData.city}, {searchData.province}</td>

                                </tr>

                            ))}

                        </tbody>
                    </table>
                </li>
            </ul>



        </div>
    );
}

export default SearchResults;