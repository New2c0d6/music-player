import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function SongCard({song, setSelected}) {
    const handleClick = () => {
        setSelected({ "label": song.name, "res": song })
    }
  return (
    <Card sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between' }} className="custom-card" onClick={handleClick}>
            <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" className='text' sx={{maxWidth: '300px'}}>
                        {song?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {song?.artists[0]?.name}
                    </Typography>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={song?.album?.images[0]?.url}
                alt={song?.name}
            />
        </Card>
  )
}

export default SongCard