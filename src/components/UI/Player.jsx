import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../App';
import { get, usePrevious } from '../../providers/helper.ts';

import '../../styles/player.css';
import Track from './Track.jsx';
import MediaControl from './MediaControl.jsx';

const Player = () => {

    const [player, setPlayer] = useState(null);
    const [track, setTrack] = useState(null);

    const { token, playerState, setPlayerState } = useContext(DataContext);

    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    const [volume, setVolume] = useState(0);

    let album = null;
    let artists = null;
    let duration_ms = 0;
    let name = "";

    let progress_ms = 0;
    let repeat_state = "";
    let shuffle_state = false;

    const prevPlayerState = usePrevious(playerState);

    useEffect(() => {
        async function getPlayer() {
            if (token !== null && !ignore) {
                let temp = null;
                temp = await get("player/currently-playing", token, true);

                if (temp !== null) {
                    setPlayer(temp);
                    setPlayerState({
                        currentIndex: playerState.currentIndex,
                        isPlaying: temp.is_playing,
                        activeSong: temp.item
                    });
                }
            }
        }
        let ignore = false;
       
        if (playerState.activeSong === null ) {
            setTimeout(() => {
                getPlayer();
            }, 300);
        }

        return () => {
            ignore = true;
        }
    }, [token, playerState])

    if (player !== null ) {
        ({ progress_ms, repeat_state, shuffle_state } = player);
        ({ album, artists, duration_ms, name } = player.item);
    }

    return (
        <div className='player__wrapper'>
            {player !== null ?
                <div className='player__items'>
                    <Track album={album} artists={artists} name={name} />
                    <MediaControl
                        shuffleState={shuffle_state}
                        repeatState={repeat_state}
                        progressMs={progress_ms}
                        durationMs={duration_ms}
                        value={appTime}
                        min='0'
                        max={duration_ms}
                        onInput={(e) => setSeekTime(e.target.value)}
                        setSeekTime={setSeekTime}
                        appTime={appTime}
                    />
                </div>

                : <h2 style={{ color: 'white' }}>Player loading...</h2>}

        </div>
    )
}

export default Player