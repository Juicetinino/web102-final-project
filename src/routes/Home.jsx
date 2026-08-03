/*
This will have bottons to bring the user to the home page with spoilers,
recommendations, or both. Also a welcome message.
*/

import Post from '../components/Post'

function Home() {
    return (
        <>
            <div className="content-container">
                <div className="content widget">
                    <h1>Welcome to the movie club!</h1>
                    <div className="home-content">
                        <div className="paragraph">
                            <p>This is a where you can find and give movie suggestions, have in-depth movie discussions, or talk about anything movie related!</p>
                            <p>Choose what you're looking for to get started.</p>
                        </div>
                        <div className="home-buttons">
                            <button>
                                Recommendations
                            </button>
                            <button>
                                Spoiler Central
                            </button>
                            <button>
                                Everything
                            </button>
                            {/* Do not show the log in button if logged in */}
                            <button>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
