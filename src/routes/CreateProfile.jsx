/*
This is a page where users can create a profile with a username and password.
There are no requirements other than every username must be unique.
And they must have some Password.
*/

function CreateProfile() {
    return (
        <>
            <div className="content-container">
                <div className="feed">
                    <h1>Create a Profile</h1>
                    <p className="paragraph">Username:</p>
                    <input type="text" />
                    {/* Display this if Username is taken or user didnt enter a username. (one or the other) */}
                    <p className="error">Username is taken OR You must enter a username</p>
                    <p className="paragraph">Password:</p>
                    <input type="text" />
                    {/* Display this if passwords don't match or user didnt enter a password. */}
                    <p className="error">Passwords must match OR You must enter a password.</p>
                    <p className="paragraph">Confirm password:</p>
                    <input type="text" />
                    {/* Display this if passwords don't match or user didnt enter a password. */}
                    <p className="error">Passwords must match OR You must enter a password.</p>
                    <button>
                        Create account.
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateProfile;
