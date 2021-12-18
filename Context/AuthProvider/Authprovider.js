import React, { createContext } from 'react'
import useFirebase from '../../Components/Hooks/useFirebase';

export const AuthContext = createContext(null);

export default function Authprovider({ children }) {
    const allContexts = useFirebase();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>

    )
}
