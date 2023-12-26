import React, { useContext } from 'react'
import { Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import { DataContext } from '../../App';
import '../../styles/playlistCard.css';


const PlaylistCard = (props) => {

    const { description, images, name, owner, tracks, uri } = props.item;
    const playlistPublic = props.item.public;
    const { user } = useContext(DataContext);


    return (

        <Card className='playlist__card' color='secondary' style={{ width: '18rem', padding: '1rem', marginBottom: '1rem' }}>
            <img src={images[1].url} alt='' />
            <CardBody>
                <CardTitle style={{ fontWeight: 'bold', color: 'white' }}>
                    {name}
                </CardTitle>
                <CardSubtitle style={{ color: 'white' }}>
                    Playlist owner:
                    {owner.display_name === user.display_name ? " You" : owner.display_name}
                </CardSubtitle>
                <CardText>
                    {description}
                </CardText>
                <div className='playlist__play'>
                    <Link to={uri}><i className="ri-play-circle-fill"></i></Link>
                </div>
            </CardBody>
            <CardFooter style={{
                color: 'white', border: 'none', textAlign: 'center',
                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: 'rgba(var(--bs-secondary-rgb),var(--bs-bg-opacity))'
            }}>
                <h6>Public: {playlistPublic ? <i className="ri-checkbox-circle-line" style={{ color: "#00cc00", fontWeight: 'bold', fontSize: '1.3rem' }}></i> : <i className="ri-checkbox-blank-circle-line" style={{ color: "#00cc00" }}></i>}</h6>
                <h6>Songs: {tracks.total}</h6>
            </CardFooter>
        </Card>
    )
}

export default PlaylistCard