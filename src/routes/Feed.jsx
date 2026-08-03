// This will include all posts. They can be filtered by spoiler, recommendations, or both.
import Post from '../components/Post';
import { Link } from 'react-router';

function Feed() {

    return (
        <>
            <div className="content-container">
                <div className="feed">
                    <Link to="../new-post">
                        <button className="full-width">

                            + Make a post
                            {/* This should say "Log in to make a post" if not logged in. */}

                        </button>
                    </Link>
                    {/* All the filtered posts appear here. Could be recommendations, spoilers, or everything. */}
                    <Post />
                </div>
            </div>
        </>
    );
};

export default Feed;
