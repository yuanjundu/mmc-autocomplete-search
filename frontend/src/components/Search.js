import React, {useState, useEffect} from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if(query.length > 0) {
            console.log(query);
            axios.get(`${process.env.REACT_APP_API_URL}/api/searchData?q=${query}`)
            .then(response => {
                setSuggestions(response.data);
            })
            .catch(error => {
                console.error("Error in search suggestions:", error);
            });
        }
        else {
            setSuggestions([]);
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
                    {suggestions.map(singer => (
                        <li key={singer._id}>
                            {singer.name}
                            {singer.albums.map(album => (
                                <div key={album._id}>
                                    {album.title}
                                    <ul>
                                        {album.songs.map(song => (
                                            <li key={song._id}>{song.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    )
}

export default Search;