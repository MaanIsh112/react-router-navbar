import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from '../components/Nav';

class HomePage extends Component {

    render() {
        return (
            <div>
                <Nav 
                    items = { {
                        left: [{name: 'Home', path: '/'}, {name: 'About', path: '/about'}, {name: 'Dashboard', path: '/dashboard'}],
                        right: [{name: 'Settings', path: '/settings'}, {name: 'Profile', path: '/profile'}, {name: 'Log Out', path: '/logout'}],
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