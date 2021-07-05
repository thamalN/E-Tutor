import { useState, useEffect } from "react";

const useFetch = (url, options) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(url, options)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data);
        })
    })

    return ( {data} );
}
 
export default useFetch;