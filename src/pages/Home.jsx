import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, debounce } from '@mui/material';
import Player from '../components/Player';
import Trending from '../components/Trending';
import { useAuth } from '../hooks/useAuth';

function Home() {
    const { logout } = useAuth();
    const [selected, setSelected] = useState({});
    const [result, setResult] = useState([]);

    const handleSearch = useCallback(debounce((searchParam) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
        };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",

        };

        fetch(`https://v1.nocodeapi.com/noelkdev/spotify/skSYGjyrulnJiCEL/search?q==${searchParam}&type=track&perPage=10`, requestOptions)
            .then(response => response.json())
            .then(res => setResult(res.tracks.items))
            .catch(error => console.log('error', error));
    }, 600), []);

    const handleSelection = (event, value) => {
        setSelected(value);
    }

    const handleLogOut = () => {
        logout();
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    className='custom-select'
                    options={result.map(result => ({ "label": result.name, "res": result }))}
                    sx={{ flex: '90%' }}
                    onChange={handleSelection}
                    renderInput={(params) => <TextField {...params} label="Search Song" onChange={(e) => handleSearch(e.target.value)} />}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ flex: '10%', height: '55px' }}
                    onClick={handleLogOut}
                >
                    Sign Out
                </Button>
            </Box>

            {selected?.label && <Player song={selected} />}
            <Trending setSelected={setSelected} />
        </div>
    )
}

export default Home