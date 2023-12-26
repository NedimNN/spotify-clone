import React, { useContext, useEffect, useState } from 'react'
import '../styles/home.css'
import { get } from '../providers/helper.ts';
import { DataContext } from '../App.js';
import PlaylistCard from '../components/UI/PlaylistCard.jsx';
import { Row } from 'reactstrap';


const Home = () => {
  const [playlists, setPlaylists] = useState(null);
  const { token } = useContext(DataContext)

  useEffect(() => {
    async function getPLaylistsCurrentUser() {
      if (token !== null && !ignore) {
        let temp = null;
        temp = await get("playlists", token, true);
        if (temp !== null) {
          setPlaylists(temp.items);
        }
      }
    };
    let ignore = false;
    getPLaylistsCurrentUser();
    return () => {
      ignore = true;
    }
  }, [token])
  function loadPlaylist(element) {
    return <PlaylistCard item={element} key={element.id} />
  }
  return (
    <div className='home'>
      <div className='library__wrapper'>
        <Row className='library__items'>
          {playlists === null && <h1>Loading...</h1>}
          {playlists !== null &&
            playlists.map(element => (
              loadPlaylist(element)
            ))
          }
        </Row>

      </div>
    </div>
  )
}

export default Home