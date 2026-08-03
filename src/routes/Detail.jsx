/*
This will show the details of a post. There will also be a section for replies.
If a post has been deleted, display a message: "Post not found. It may have been deleted."
*/
import Reply from '../components/reply';
import UpArrow from '../assets/UpArrow.svg';
import DownArrow from '../assets/DownArrow.svg';

function Detail() {
    return (
        <>
            <div className="content-container">
                <div className="feed">
                    <div className="detail-widget widget">
                        <img className="detail-image" src="https://m.media-amazon.com/images/M/MV5BOTM5ODBlOTAtYjcwZi00YzkzLWIzODEtMTM2MTZlNDFmMWU2XkEyXkFqcGc@._V1_.jpg" alt="" />
                        <div className="detail-info">
                            <h2>Flow: This is the title. Here, the full title is displayed.</h2>
                            <div className="post-info">
                                <p>Posted by USERNAME</p>
                                <p>August 3rd, 2026 - 1:23 am</p>
                            </div>
                            <p>The movie flow was a beautiful stride for indie animation. The fact that it was made completely in blender is a huge win for independent artists. I sure hope Blender becomes more industry standard than silly expensive clunky software like Maya or cinema 4D!</p>
                        </div>
                    </div>
                    <div className="detail-options">
                        {/* The upvote widget only says the number of widets if not logged in.
                         If logged in, there are two arrows. If logged in, the user can upvote or downvote the post.
                         Upvotes and downvotes are counted per post, but not tracked by user. Any user can upvote/downvote as many times as they want. */}
                        <div className="widget upvotes">
                            <img src={UpArrow} alt="arrow-icon" className="logo2" />
                            {/* Number of upvotes */}
                            <p>123</p>
                            <img src={DownArrow} alt="arrow-icon" className="logo2" />
                        </div>
                        {/* This button says "log in" if the user is not logged in. 
                        When clicked, this button changes to say "post" and the input box below appears for
                        the user to be able to post their reply.*/}
                        <button className='recommend-button'>Write a reply</button>
                        {/* This should be made into a textarea componenet */}
                    </div>
                    <input type="text" placeholder="What do you think?" className="input-height" />
                    <Reply />
                    <Reply />
                    <Reply />
                    <Reply />
                </div>
            </div>
        </>
    );
};

export default Detail;
