import { useEffect, useState } from 'react';

const SearchResults = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const results = props.results;


    return (
        <div className="b2">

                        <ul>
                            <li className="reg_title">
                                <h3>Search Results</h3>
                            </li>
                            <li>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">User ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {results.map((searchData, i) => (
                                            <tr>
                                            <td>{searchData.user_id}</td>
                                            <td>{searchData.fname} {searchData.lname}</td>
                                            <td>{searchData.email}</td>
                                            <td>{searchData.contact}</td>
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