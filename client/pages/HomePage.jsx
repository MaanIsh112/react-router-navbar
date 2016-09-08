import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from '../components/Nav';

class HomePage extends Component {

    render() {
        return (
            <div>
                <Nav 
                    items = { {
                        left: [{name: 'Home', path: '/', icon: 'fa fa-home'}, {name: 'About', path: '/about', icon: ' fa fa-user'}, {name: 'Dashboard', path: '/dashboard', icon: ' fa fa-envelope'}],
                        right: [{name: 'Profile', path: '/profile', icon: 'fa fa-home'}, {name: 'Log Out', path: '/logout', icon: 'fa fa-power-off'}],
                        logo: {name: 'LippyNavBar', path:'/'}
                        }
                    }
                    navButton = { {side: 'left', icon: 'fa fa-cogs'} }
                />
                <h1>Home Page</h1>
            </div>
        )
    }
}

export default HomePage;