import { useEffect, useState } from 'react';

const SearchResults = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const results = props.results;



    const highlight = () => {
        var merged = [].concat.apply([], results.keywords);
       // console.log(merged)

        let rows = document.getElementsByTagName("tr")
        //console.log(rows)
        rows = [...rows]
        //console.log(rows)

        let reg = ""
        for (let i = 0; i < merged.length; i++) {
            reg += merged[i].toString()
            if (i !== merged.length - 1) reg += "|"
        }

        //reg += "/"

        //console.log(reg)

        const reg2 = new RegExp(reg)
        //console.log(reg2)

        rows.forEach(i => {
            if(i.textContent.toString().match(reg2) !== null) {
                //i.textContent = "1"
                console.log(i.textContent.toString().match(reg2)[0])
           // i.textContent.style.fontWeight = 'bold'
            //i.textContent.toString().match(reg2)[0].set
            }
        }
        
    )

    }

    //highlight()

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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Address</th>
                                <th scope="col">School</th>

                            </tr>
                        </thead>
                        <tbody>

                            {results.map((searchData, i) => (
                                <tr>
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