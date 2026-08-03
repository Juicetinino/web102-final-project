import { Link } from 'react-router';
import { useAuth } from '../useAuth';

function Home() {
    const { profile } = useAuth();

    return (
        <div className="content-container">
            <div className="content widget">
                <h1>Welcome to the movie club!</h1>
                <div className="home-content">
                    <div className="paragraph">
                        <p>This is a where you can find and give movie suggestions, have in-depth movie discussions, or talk about anything movie related!</p>
                        <p>Choose what you're looking for to get started.</p>
                    </div>
                    <div className="home-buttons">
                        <Link to="/feed?category=recommendation"><button className="full-width">Recommendations</button></Link>
                        <Link to="/feed?category=spoiler"><button className="full-width">Spoiler Central</button></Link>
                        <Link to="/feed"><button className="full-width">Everything</button></Link>
                        {!profile && (
                            <Link to="/log-in"><button className="full-width">Log in</button></Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
