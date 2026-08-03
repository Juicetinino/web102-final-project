import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

function CreateProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { logIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');

        let hasError = false;
        if (!username.trim()) {
            setUsernameError('You must enter a username.');
            hasError = true;
        }
        if (!password || !confirmPassword) {
            setPasswordError('You must enter a password.');
            hasError = true;
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords must match.');
            hasError = true;
        }
        if (hasError) return;

        const { data, error } = await supabase
            .from('profiles')
            .insert({ username: username.trim(), password })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                setUsernameError('Username is taken.');
            } else {
                setUsernameError('Something went wrong. Please try again.');
            }
            return;
        }

        logIn(data);
        navigate('/');
    }

    return (
        <div className="content-container">
            <div className="feed">
                <h1>Create a Profile</h1>
                <form onSubmit={handleSubmit}>
                    <p className="paragraph">Username:</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && <p className="error">{usernameError}</p>}

                    <div className="row">
                        <p className="paragraph">Password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className="paragraph">Confirm password:</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                    <button type="submit">Create account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
