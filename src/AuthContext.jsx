import { useState } from 'react';
import { AuthContext } from './authContext';

function readStoredProfile() {
    const stored = localStorage.getItem('profile');
    return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(readStoredProfile);

    function logIn(newProfile) {
        localStorage.setItem('profile', JSON.stringify(newProfile));
        setProfile(newProfile);
    }

    function logOut() {
        localStorage.removeItem('profile');
        setProfile(null);
    }

    return (
        <AuthContext.Provider value={{ profile, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
