import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username.trim())
            .eq('password', password)
            .maybeSingle();

        if (!data) {
            setError('Incorrect username or password.');
            return;
        }

        logIn(data);
        navigate('/');
    }

    return (
        <div className="content-container">
            <div className="feed">
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <p className="paragraph">Username:</p>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="paragraph">Password:</p>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Log in</button>
                </form>
                <div className="create">
                    <p>Don't have an account?</p>
                    <Link to="../create-profile/">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
