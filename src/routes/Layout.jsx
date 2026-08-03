import { Outlet, Link, useNavigate } from 'react-router';
import logo from '../assets/logo.svg'
import { useAuth } from '../useAuth';

function Layout() {
    const { profile, logOut } = useAuth();
    const navigate = useNavigate();

    function handleLogOut() {
        logOut();
        navigate('/');
    }

    return (
        <>
            <div className="top-bar">
                <div className="top-bar-content">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Website logo" className="logo2" />
                    </Link>
                    <div className="spacer"></div>
                    <p className="menu-option"><Link to="/feed?category=recommendation">Recommendations</Link></p>
                    <p className="menu-option"><Link to="/feed?category=spoiler">Spoiler Central</Link></p>
                    <p className="menu-option"><Link to="/feed">Everything</Link></p>
                    {profile ? (
                        <>
                            <p className="menu-option">Hi, {profile.username}</p>
                            <button onClick={handleLogOut}>Log out</button>
                        </>
                    ) : (
                        <Link to="/log-in"><button>Log in</button></Link>
                    )}
                </div>
            </div>
            <div className="content-window">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
