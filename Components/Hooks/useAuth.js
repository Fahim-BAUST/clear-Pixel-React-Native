import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { AuthContext } from '../../Context/AuthProvider/Authprovider';

export default function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}
