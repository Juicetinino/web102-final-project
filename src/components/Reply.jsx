/*
This contains what is included in a reply.
Title, user, time.
If the reply belongs to m a logged in user, show edit and delete buttons.
Edit button brings you to the reply page.
*/

function Reply() {
    return (
        <>
            <div className="widget post">
                <h3>Flow: This is the title. It gets cut off if too long...</h3>
                <div className="post-info">
                    <p>Posted by USERNAME</p>
                    <p>August 3rd, 2026 - 1:23 am</p>
                    <p> 123 upvotes</p>
                </div>
            </div>
        </>
    );
};

export default Reply;
