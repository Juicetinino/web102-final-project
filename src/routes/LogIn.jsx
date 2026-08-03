/*
This page will allow users to sign in. If the username and password is correct,
the user gets signed in and can then post and edit or delete their posts.
If the username or password are incorrect or do not exist, there is a message
that says "Incorrect username or password. If you don't have a profile,
create one"
*/

import { Link } from 'react-router';

function LogIn() {

    return (
        <>
            <div className="content-container">
                <div className="feed">
                    <p className="paragraph">Username:</p>
                    <input type="text" placeholder="Enter username" />
                    <p className="paragraph">Password:</p>
                    <input type="text" placeholder="Enter password" />
                    {/* Display this if entered username does not exist or password is incorrect */}
                    <p className="error">Incorrect username or password.</p>
                    <button>
                        Log in
                    </button>
                    <div className="create">
                        <p>Don't have an account?</p>
                        <Link to="../create-profile/">Create one</Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LogIn;
