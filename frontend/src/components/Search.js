import React, {useState, useEffect} from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import './Search.css';
import Input from "@mui/material/Input";
import List from '@mui/material/List';
import { ListItemText, ListSubheader, Box } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';

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
        <Box className="search-container">
            <Input label="Search for artists, albums or songs..." className="search-field" variant="outlined"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for artists, albums or songs..."
                sx={{':after': { borderBottomColor: 'darksalmon' }}}
            />

            {query && 
            <Box className="results">
                <List className="results-list">
                    <ListItemText className="input-query">
                        <IoIosSearch className="icon"/>
                        {query}
                    </ListItemText>
                    {results && results.length > 0 ? (results.map((result, index) => (
                            <ListItemText key={index} className="result-items"
                            sx={{marginBottom: "0", marginTop: "0"}}>
                                {result.value}
                                <div>
                                    <span className="details">{result.type}</span>
                                    {result.singer && <span className="details"> · <strong>{result.singer}</strong></span>}
                                    {result.album && <span className="details"> · {result.album}</span>}
                                </div>
                            </ListItemText>
                        ))):(
                            <ListItemText className="result-items"
                            sx={{color: "grey", alignItems: "center"}}>
                                <Box sx={{display: "flex"}}>
                                    <SearchOffIcon />Results not found
                                </Box>
                            </ListItemText>
                        )}
                </List>
            </Box>}
        </Box>
    )
}

export default Search;