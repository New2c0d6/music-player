import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const Widget = styled('div')(() => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

function Player({ song }) {
    const audioRef = useRef(null);
    const [duration, setDuration] = React.useState(0);
    const [position, setPosition] = React.useState(0);
    const [paused, setPaused] = React.useState(true);
    const [volume, setVolume] = React.useState(30);

    useEffect(() => {
        setPaused(true);
        const audio = audioRef.current;
        const setAudioData = () => {
            setDuration(Math.round(audio.duration));
        };
        const setAudioTime = () => {
            const audio = audioRef.current;
            if(duration <= Math.round(audio.currentTime)){
                setPaused(true);
                setPosition(0);
                return
            }
            setPosition(Math.round(audio.currentTime));
        };

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, [song?.res?.name]);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value % 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (paused) {
            audio.play();
        } else {
            audio.pause();
        }
        setPaused(!paused);
    };

    const handleSliderChange = (_, value) => {
        const audio = audioRef.current;
        audio.currentTime = value;
        setPosition(value);
    };

    const handleVolumeChange = (_, value) => {
        const audio = audioRef.current;
        audio.volume = value / 100;
        setVolume(value);
    };

    const mainIconColor = '#000';
    const lightIconColor = 'rgba(0,0,0,0.4)';

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', margin: '20px' }}>
            <audio ref={audioRef} src={song.res.preview_url} />
            <Widget className='custom-player'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoverImage>
                        <img
                            alt={song.res.name}
                            src={song?.res?.album?.images[0]?.url}
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {song.res.album.name}
                        </Typography>
                        <Typography noWrap>
                            <b>{song.res.name}</b>
                        </Typography>
                        <Typography noWrap letterSpacing={-0.25}>
                            {song.res.artists[0].name}
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={handleSliderChange}
                    sx={{
                        color: 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&::before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={handlePlayPause}
                    >
                        {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                            />
                        ) : (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                    <VolumeDownRounded htmlColor={lightIconColor} />
                    <Slider
                        aria-label="Volume"
                        value={volume}
                        onChange={handleVolumeChange}
                        sx={{
                            color: 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                '&::before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded htmlColor={lightIconColor} />
                </Stack>
            </Widget>
        </Box>
    );
}

export default Player;
