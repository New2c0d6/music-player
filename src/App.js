import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce, styled } from '@mui/material';
import Player from './components/Player';
import Trending from './components/Trending';

function App() {

  const [selected, setSelected] = useState({});
  const [result, setResult] = useState([]);

  // useEffect(() => {


  // }, [])

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

  const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    zIndex: -1,
    '&::before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      background:
        'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&::after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      background:
        'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
      transform: 'rotate(30deg)',
    },
  });


  return (
    <div className="App">
      <WallPaper />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        className='custom-select'
        options={result.map(result => ({ "label": result.name, "res": result }))}
        sx={{ width: '100%'}}
        onChange={handleSelection}
        renderInput={(params) => <TextField {...params} label="Search Song" onChange={(e) => handleSearch(e.target.value)} />}
      />
      {selected?.label && <Player song={selected} />}
      <Trending  setSelected={setSelected}/>
    </div>
  );
}

export default App;
