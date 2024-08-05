import React, { useEffect, useState } from 'react';
import SongCard from './SongCard';

function Trending({setSelected}) {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        // fetch("https://v1.nocodeapi.com/noelkdev/spotify/skSYGjyrulnJiCEL/usersTop?type=tracks", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         setTrending(result.items);
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //         setError(error);
        //         setLoading(false);
        //     });
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">Error fetching data</div>;
    }

    return (
        <>
        <h3>Trending Songs</h3>
        <div className='trending'>
            
            {trending.map((song, index) => (
                <SongCard key={index} song={song} setSelected={setSelected}/>
            ))}
        </div>
        </>
    );
}

export default Trending;
