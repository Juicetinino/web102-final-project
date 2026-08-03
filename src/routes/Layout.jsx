/*
This will include a top bar that has a home/logo button,
a recommendations button, and a spoiler central button.
Also a sign in/create an account button.
*/

import { Outlet, Link } from 'react-router';
import logo from '../assets/logo.svg'

function Layout() {
    return (
        <>
            <div className="top-bar">
                <div className="top-bar-content">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Website logo" className="logo2" />
                    </Link>
                    <div className="spacer"></div>
                    <p className="menu-option">Recommendations</p>
                    <p className="menu-option">Spoiler Central</p>
                    <p className="menu-option"><Link to="Feed">Everything</Link></p>
                    {/* The log in button should be a log out button if the user is logged in */}
                    <button><Link to="log-in/">Log in</Link></button>
                </div>
            </div>
            <div className="content-window">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
