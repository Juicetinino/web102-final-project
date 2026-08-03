/*
This contains the part of a post that will be displayed in the feed.
Title, times, upvotes count.
If the title is wider than one line allows, truncate with ...
If the post belongs to m a logged in user, show edit and delete buttons.
Edit button brings you to the post page.
Color scheme is dependent on whether it is a recommendation or a spoiler type post.
*/
import { Link } from 'react-router';

function Post() {
    return (
        <>

            <Link to="../post-detail/1" className="widget post">
                <h3>Flow: This is the title. It gets cut off if too long...</h3>
                <div className="post-info">
                    <p>Posted by USERNAME</p>
                    <p>August 3rd, 2026 - 1:23 am</p>
                    <p> 123 upvotes</p>
                </div>
            </Link>
        </>
    );
};

export default Post;
