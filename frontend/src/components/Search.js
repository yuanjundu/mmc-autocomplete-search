import React, {useState, useEffect} from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import './Search.css';
import Input from "@mui/material/Input";
import List from '@mui/material/List';
import { ListItemText, ListSubheader } from "@mui/material";

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
        <div className="search-container">
            <Input label="Search for singers, albums or songs..." className="search-field" variant="outlined"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for singers, albums or songs..."
                sx={{':after': { borderBottomColor: 'darksalmon' }}}
            />

            {query && 
            <div className="results">
                <List className="results-list">
                    <ListItemText className="input-query">
                        <IoIosSearch className="icon"/>
                        {query}
                    </ListItemText>
                    {results.map((result, index) => (
                            <ListItemText key={index} className="result-items">
                                {result.value}
                                <div>
                                    <span className="details">{result.type}</span>
                                    {result.singer && <span className="details"> · <strong>{result.singer}</strong></span>}
                                    {result.album && <span className="details"> · {result.album}</span>}
                                </div>
                            </ListItemText>
                        ))}
                </List>
            </div>}
        </div>
    )
}

export default Search;