import React from 'react'

const MediaControl = ({ shuffleState, isPlaying, repeatState, progressMs, durationMs }) => {

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


    return (
        <div className='media__control__wrapper'>
            <div className='media__control'>
                {shuffleState ?
                    <i style={{ color: '#00cc00' }} className="ri-shuffle-fill"></i>
                    : <i className="ri-shuffle-fill"></i>
                }
                <i className="ri-skip-back-fill"></i>
                <div className='play__pause'>

                    {isPlaying ? <i style={{ fontSize: 'larger' }} className="ri-pause-fill"></i> :
                        <i style={{ fontSize: 'larger' }} className="ri-play-fill"></i>}

                </div>
                <i className="ri-skip-forward-fill"></i>
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
                <p>{convertMsToMinutesSeconds(progressMs)}</p>

                <p>{convertMsToMinutesSeconds(durationMs)}</p>
            </div>


        </div>
    )
}

export default MediaControl