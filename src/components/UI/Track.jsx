import React from 'react'
import '../../styles/player.css';

const Track = ({ album, artists, name }) => {
    function loadArtists() {
        let names = "";
        names += artists.map((element) => {
            return " " + element.name;
        });
        return names;
    }
    function setArtistsWidth(e) {
        let w = e.offsetWidth;
        let names = document.getElementById('artistsNames');
        if (w > 0) {
            if (e.children[1].children[0].offsetWidth > w) {
                document.documentElement.style.setProperty('--artist-width', w + "px");
            }
            else {
                names.style.setProperty('width', w + "px")
            }
        }
    }
    return (
        <div className='track__info'>
            <div className='track__img'>
                <img src={album.images[2].url} alt='' />
            </div>
            <div ref={element => {
                if (element) {
                    setArtistsWidth(element);
                }
            }} className='track__name__artists' style={{ color: 'white' }} >
                <p style={{ fontWeight: 'bold', margin: 0, width: '100%' }}>{name}</p>
                <div id='artistsNames' className="artists__names" >
                    <span id='artistsSpan'>{loadArtists()}</span>
                </div>
            </div>
        </div>
    )
}

export default Track