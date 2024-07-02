import React, {useState, useEffect} from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if(query.length > 0) {
            
        }
    })

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

            <div className="suggestionList">
                 <ul>
                    <li>{query}</li>
                    {}
                 </ul>
            </div>
        </div>
    )
}

export default Search;