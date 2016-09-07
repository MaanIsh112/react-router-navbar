import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            url: ''
        }
    }
    listenForUrl() {
        browserHistory.listen( (ev) => this.setState({url: ev.pathname}));
    }
    componentWillMount() {
        // find out the url and set it to state to later be used for active class
        const unlisten = browserHistory.listen( (ev) => this.setState({url: ev.pathname}));
        // stop browser history from listening
        unlisten();
    }
    componentWillUnmount() {
        
    }
    getNavItems(side) {
        function itemTapped(path) {
            browserHistory.push(path)
        }
        return side.map( ({name, path}) => {
            /*const listItemStyle = {
                padding: "15px 15px",
                display: "inline-block",
                textAlign: "center",
                cursor: "pointer"
            }*/
            const listItemStyle = {}
            // give navItem an active class if its path = url
            const active = path === this.state.url? 'active' : ''
            return (
                <li className={`listItem ${active}`} style={listItemStyle} onClick={ () => {itemTapped(path)} } key={`${name}${path}`}>{name}</li>
            )
        })
    }
    render() {
        /*const navStyle = {
            padding: "5px 10px",
            backgroundColor: "#E8E8E8",
            color: "#434343",
            fontFamily: "monospace",
            fontSize: 20,
        }*/
        return (
            <div className="navigation-wrapper">
                <ul className="leftItemsList">
                    <Link className="logo" to={this.props.items.logo.path}>{this.props.items.logo.name}</Link>
                    {this.getNavItems(this.props.items.left)}
                </ul>
                <ul className="rightItemsList">
                    {this.getNavItems(this.props.items.right)}
                </ul>
                <div className="clear"></div>
            </div>
        )
    }
}

export default Nav;