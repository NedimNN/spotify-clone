import React from 'react'

const SeekBar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
    return (
        <div className='seekbar__wrapper'>

            <a type='button' onClick={() => setSeekTime(appTime - 5)} className='btn__back'>
                <i className="ri-replay-5-line"></i>
            </a>

            <input
                type='range'
                step='any'
                value={value}
                min={min}
                max={max}
                onInput={onInput}
                className='seek__bar'
            />

            <a type='button' onClick={() => setSeekTime(appTime + 5)} className='btn__forward'>
                <i className="ri-forward-5-line"></i>
            </a>

        </div>
    )
}

export default SeekBar