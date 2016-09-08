import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            menuOpen: false,
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
    getNavItems(side) {
        function itemTapped(path) {
            browserHistory.push(path)
        }
        return side.map( ({name, path, icon}) => {
            /*const listItemStyle = {
                padding: "15px 15px",
                display: "inline-block",
                textAlign: "center",
                cursor: "pointer"
            }*/
            if (typeof name !== "string" || typeof path !== "string") {
                throw new Error('name and path (url) must be strings');
            }
            if (!name.trim() || !path.trim()) {
                throw new Error('name and path (url) are required i.e left: [{name: "About", path: "/about"}]. Also, name and path may not be an empty strings');
            }
            const listItemStyle = {}
            // give navItem an active class if its path = url
            const active = path === this.state.url? 'active' : '';
            const symbol = icon ? icon : '';
            return (
                <li className={`listItem ${active}`} style={listItemStyle} onClick={ () => {itemTapped(path)} } key={`${name}${path}`}><i className={`${symbol} hideSmall`}  aria-hidden="true"></i> {name}</li>
            )
        })
    }
    openMenu() {
        this.setState({menuOpen: !this.state.menuOpen})
    }
    render() {
        // add menu open class for it to show in css
        const menuOpen = this.state.menuOpen ? 'menuOpen' : '';
        // add navButton class for the button to be visible in css (default side is right)
        const navButton = this.props.navButton ? this.props.navButton.side : 'right';
        const navButtonLeft = navButton === 'left' ? 'visible' : '';
        const navButtonRight = navButton === 'right' ? 'visible' : '';
        // did user provide an icon? default bars
        const navButtonIcon = this.props.navButton ? this.props.navButton.icon : 'fa fa-bars';
        // when nav is open create a layer over the body to click on to close nav
        const navOpenLayer = this.state.menuOpen ? 'navOpenLayer' : '';
        // if user provided logo information
        if (this.props.items.logo) {
            // throw error if developer forgot to include the url path where to direct user if clicked on logo
            if (!this.props.items.logo.path) {
                throw new Error('logo path (url) is required i.e {logo: {name: "LippyNavBar", path: "/"}}. Also, path may not be an empty string');
            }
            // throw error if url is not a string
            if (typeof this.props.items.logo.path !== "string") {
                throw new Error('logo path (url) must be a string');
            }
            return (
                <div className="navigation-wrapper">
                    <Link className="logo" to={this.props.items.logo.path}>{this.props.items.logo.name}</Link>
                    <ul className="leftItemsList">
                        <button onClick={this.openMenu.bind(this)} className={`naviButton-left ${navButtonLeft}`}><i className={navButtonIcon} aria-hidden="true"></i></button>
                        {this.getNavItems(this.props.items.left)}
                    </ul>
                    <ul className="rightItemsList">
                        {this.getNavItems(this.props.items.right)}
                        <button onClick={this.openMenu.bind(this)} className={`naviButton-right ${navButtonRight}`}><i className={navButtonIcon} aria-hidden="true"></i></button>
                    </ul>
                    <ul className={`leftItemsListSmall ${menuOpen}`}>
                        {this.getNavItems(this.props.items.left)}
                    </ul>
                    <ul className={`rightItemsListSmall ${menuOpen}`}>
                        {this.getNavItems(this.props.items.right)}
                    </ul>
                    <div className={`clear ${navOpenLayer}`} onClick={()=> this.setState({menuOpen: false})}></div>
                </div>
            );
        } else {
            // if user did not provide logo information
            return (
                <div className="navigation-wrapper">
                    <ul className="leftItemsList">
                        <button onClick={this.openMenu.bind(this)} className={`naviButton-left ${navButtonLeft}`}><i className={navButtonIcon} aria-hidden="true"></i></button>
                        {this.getNavItems(this.props.items.left)}
                    </ul>
                    <ul className="rightItemsList">
                        {this.getNavItems(this.props.items.right)}
                        <button onClick={this.openMenu.bind(this)} className={`naviButton-right ${navButtonRight}`}><i className={navButtonIcon} aria-hidden="true"></i></button>
                    </ul>
                    <ul className={`leftItemsListSmall ${menuOpen}`}>
                        {this.getNavItems(this.props.items.left)}
                    </ul>
                    <ul className={`rightItemsListSmall ${menuOpen}`}>
                        {this.getNavItems(this.props.items.right)}
                    </ul>
                    <div className={`clear ${navOpenLayer}`} onClick={()=> this.setState({menuOpen: false})}></div>
                </div>
            );
        }
    }
}

export default Nav;