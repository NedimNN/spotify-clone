import React, { useContext, useEffect, useRef } from 'react'
import SeekBar from './SeekBar';
import { DataContext } from '../../App';
import { post, put, usePrevious } from '../../providers/helper.ts';


const MediaControl = ({ shuffleState, repeatState, progressMs, durationMs, value, min, max, onInput, setSeekTime, appTime }) => {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function convertMsToMinutesSeconds(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);

        return seconds === 60
            ? `${minutes + 1}:00`
            : `${minutes}:${padTo2Digits(seconds)}`;
    }
    const { token, playerState, setPlayerState } = useContext(DataContext);
    const firstRender = useRef(true);
    function PlayOrPause() {
        setPlayerState({
            currentIndex: playerState.currentIndex,
            isPlaying: !playerState.isPlaying,
            activeSong: playerState.activeSong
        });
    }


    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        let ignore = false;
        async function playSongs() {
            if (token !== null && !ignore) {
                let temp = await put('player/play', token, true);
                if (temp !== null) {
                    console.log("Playing...")
                }
            }
        }
        async function pauseSongs() {
            if (token !== null && !ignore) {
                let temp = await put('player/pause', token, true);
                if (temp !== null) {
                    console.log("Pausing...")
                }
            }
        }
        if (!playerState.isPlaying) {
            pauseSongs();
        }
        else {
            playSongs();
        }

        return () => {
            ignore = true;
        }
    }, [playerState.isPlaying]);

    const prevPlayerState = usePrevious(playerState);
    
    useEffect(() => {
        let ignore = false;

        async function skipNextORPrev(direction) {
            if (token !== null & !ignore) {
                let temp = await post('player/' + direction, token, true);
                if (temp !== null) {
                    console.log("Skipping to " + direction + "...")
                    setPlayerState({
                        currentIndex: playerState.currentIndex,
                        isPlaying: playerState.isPlaying,
                        activeSong: null
                    });
                }
            }
        }
        if (prevPlayerState !== undefined && playerState !== null) {
            if (prevPlayerState.currentIndex < playerState.currentIndex) {
                skipNextORPrev('next');
            }
            else {
                skipNextORPrev('previous');
            }
        }

        return () => {
            ignore = true;
        }
    }, [playerState.currentIndex])
    return (
        <div className='media__control__wrapper'>
            <div className='media__control'>
                {shuffleState ?
                    <i style={{ color: '#00cc00' }} className="ri-shuffle-fill"></i>
                    : <i className="ri-shuffle-fill"></i>
                }
                <a style={{ textDecoration: 'none' }}
                    onClick={() => {
                        setPlayerState({
                            currentIndex: playerState.currentIndex - 1,
                            isPlaying: playerState.isPlaying,
                            activeSong: playerState.activeSong
                        });
                    }}>
                    <i className="ri-skip-back-fill"></i>
                </a>
                <div className='play__pause'>

                    {playerState.isPlaying ? <a
                        onClick={() => {
                            PlayOrPause();
                        }}
                        style={{ textDecoration: 'none' }}>
                        <i style={{ fontSize: 'larger' }} className="ri-pause-fill"></i>
                    </a> :
                        <a
                            onClick={() => {
                                PlayOrPause();
                            }} style={{ textDecoration: 'none' }}>
                            <i style={{ fontSize: 'larger' }} className="ri-play-fill"></i>
                        </a>}

                </div>
                <a style={{ textDecoration: 'none' }}
                    onClick={() => {
                        setPlayerState({
                            currentIndex: playerState.currentIndex + 1,
                            isPlaying: playerState.isPlaying,
                            activeSong: playerState.activeSong
                        });
                    }}>

                    <i className="ri-skip-forward-fill"></i>
                </a>
                <div className='repeat'>
                    {repeatState === "off" &&
                        <i className="ri-repeat-2-fill"></i>
                    }
                    {repeatState === "context" &&
                        <i style={{ color: '#00cc00' }} className="ri-repeat-2-fill"></i>
                    }
                    {repeatState === "track" &&
                        <i style={{ color: '#00cc00' }} className="ri-repeat-one-fill"></i>
                    }
                </div>
            </div>

            <div className='track__progress'>
                <p style={{ margin: 0 }}>{convertMsToMinutesSeconds(progressMs)}</p>
                <SeekBar value={value}
                    min={min}
                    max={max}
                    onInput={onInput}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <p style={{ margin: 0 }}>{convertMsToMinutesSeconds(durationMs)}</p>
            </div>


        </div>
    )
}

export default MediaControl