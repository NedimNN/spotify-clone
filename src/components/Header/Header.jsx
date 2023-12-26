import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Container, } from 'reactstrap'
import '../../styles/header.css'
import { get, authorizeUser } from '../../providers/helper.ts';
import { DataContext } from '../../App.js';


const navigationLinks = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/explore',
        display: 'Explore'
    },
    {
        path: '/profile',
        display: 'Profile'
    },
]


const Header = () => {
    const { token, setToken, user, setUser } = useContext(DataContext);
    useEffect(() => {
        async function getUser() {
            const tokenString = await authorizeUser(token);
            setToken(tokenString);
            if (tokenString !== null && !ignore) {
                const tempUser = await get("me", tokenString);
                setUser(tempUser);
                if (tempUser !== null && tempUser.images[0] !== null) {
                    let avatarImage = new Image(43, 43);
                    avatarImage.src = tempUser.images[0].url;
                    document.getElementById("avatar__icon").appendChild(avatarImage);
                    document.getElementById("displayName").textContent = tempUser.display_name;
                }
            }
        }
        let ignore = false;
        getUser();
        return () => {
            ignore = true;
        }


    }, [])
    return (
        <div className='header'>

            <div className='navigation'>
                <Container>
                    <div className='navigation__wrapper'>

                        <div className='menu'>
                            <div className='spotify__logo'>
                                <Link to='/home' className='link__home'><i className="ri-spotify-fill"></i></Link>
                            </div>
                            {
                                navigationLinks.map((item, index) => (
                                    <NavLink to={item.path} key={index} className={
                                        navClass => navClass.isActive ? 'nav__active nav__item' : 'nav__item'}>{item.display}</NavLink>
                                ))
                            }

                        </div>
                        <div className='nav__right'>
                            <div className='logout'>
                                <span id='avatar__icon'>
                                </span>
                                <p id='displayName' style={{margin:0}}></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

        </div>

    )
}

export default Header