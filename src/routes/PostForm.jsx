/*
This will be a form where users can make a post that can either be recommendation type
or spoiler type. Based on the mode they are in, it displays the relevant message.
If this is an edit, this should load the relevant information and have a "confirm" button instead of
a "post" button.
Recommendation message: "Make a movie recommendation or request recommendations from others.
Remember, all recommendation posts and replies should not reveal or discuss anything not
included in the relevant movie's trailer."
Spoiler message: "Discuss any aspect of the movie you are referrencing.
Include the title of the movie in your post title so others know what they're getting into.
*/

function PostForm() {
    return (
        <>
            <div className="content-container">
                <div className="feed">
                    <div className="post-type">
                        {/* These should be the same width */}
                        <button className="recommend-button">Recommendation</button>
                        <button className="spoiler-button">Spoiler</button>
                    </div>
                    <p className="left-aligned">Make a movie recommendation or request recommendations from others.
                        Remember, all recommendation posts and replies should not reveal or discuss anything not
                        included in the relevant movie's trailer.</p>
                    <p className="paragraph">Title:</p>
                    <input type="text" placeholder="Enter title" />
                    <p className="paragraph">Image URL:</p>
                    <input type="text" placeholder="Enter image URL (optional)" />
                    <p className="paragraph">Post content:</p>
                    {/* This should be made into a textarea componenet */}
                    <input type="text" placeholder="What's on your mind?" className="input-height" />
                    <button className="full-width">
                        Post
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostForm;
