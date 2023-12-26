import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DataContext } from '../../App';
import { get } from '../../providers/helper.ts';
import { Col, Row } from 'reactstrap';

import '../../styles/player.css';
import Track from './Track.jsx';
import MediaControl from './MediaControl.jsx';

const Player = () => {

    const [player, setPlayer] = useState(null);
    const [track, setTrack] = useState(null);

    const { token, playerState, setPlayerState } = useContext(DataContext);
    let album = null;
    let artists = null;
    let duration_ms = 0;
    let name = "";

    let is_playing = false;
    let progress_ms = 0;
    let repeat_state = "";
    let shuffle_state = false;


    useEffect(() => {
        async function getPlayerandQ() {
            if (token !== null && !ignore) {
                let temp = null;
                temp = await get("player", token, true);
                let q = null;
                q = await get('player/queue', token, true)
                if (temp !== null) {
                    setPlayer(temp);
                }
                if (q !== null) {
                    setPlayerState({
                        currentSongs: q.queue,
                        currentIndex: -1,
                        isPlaying: false,
                        activeSong: q.currently_playing
                    })
                }
            }
        }
        let ignore = false;
        getPlayerandQ();
        return () => {
            ignore = true;
        }
    }, [token])

    useEffect(() => {
        if (playerState.currentSongs.length) {
            setPlayerState({
                currentSongs: playerState.currentSongs,
                currentIndex: playerState.currentIndex,
                isPlaying: true,
                activeSong: playerState.activeSong
            });
        }
    }, [playerState.currentIndex])

    if (player !== null && track === null) {
        setTrack(player.item);
    }

    if (track !== null) {
        ({ is_playing, progress_ms, repeat_state, shuffle_state } = player);
        ({ album, artists, duration_ms, name } = track);
    }

    function nextSong() {
        let i = playerState.currentIndex + 1;
        setPlayerState({
            currentSongs: playerState.currentSongs,
            currentIndex: i,
            isPlaying: true,
            activeSong: playerState.currentSongs[i]
        });
    }

    

    return (
        <div className='player__wrapper'>
            {track !== null ?
                <div className='player__items'>
                    <Track album={album} artists={artists} name={name} />
                    <MediaControl shuffleState={shuffle_state} isPlaying={is_playing} repeatState={repeat_state} progressMs={progress_ms} durationMs={duration_ms} />
                    {console.log(playerState)}

                </div>

                : <h2 style={{ color: 'white' }}>Player loading...</h2>}

        </div>
    )
}

export default Player