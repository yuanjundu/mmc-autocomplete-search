import React, {useState, useEffect} from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if(query.length > 0) {
            console.log("Query:", query);
            axios.get(`${process.env.REACT_APP_API_URL}/api/searchData?q=${query}`)
            .then(response => {
                setResults(response.data.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error in search results:", error);
            });
        }
        else {
            setResults([]);
        }
    }, [query]);

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button>
                <IoIosSearch />
            </button>

            <div className="suggestionsList">
                 <ul>
                    <li>{query}</li>
                    {results.map((result, index) => (
                        <li key={index}>
                            {result.type}: {result.value}
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    )
}

export default Search;