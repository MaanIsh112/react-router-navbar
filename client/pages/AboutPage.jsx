import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from '../components/Nav';

class AboutPage extends Component {

    render() {
        return (
            <div>
                <Nav 
                    items={ {
                        left: [{name: 'Home', path: '/'}, {name: 'About', path: '/about'}, {name: 'Dashboard', path: '/dashboard'}],
                        right: [{name: 'Settings', path: '/settings'}, {name: 'Log Out', path: '/logout'}],
                        //middle: []
                        logo: {name: 'LippyNavBar', path:'/'}
                        }
                    }
                />
                <h1>About Page</h1>
            </div>
        )
    }
}

export default AboutPage;