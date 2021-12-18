import { Heading, HStack, Spinner, NativeBaseProvider, } from 'native-base';
import React from 'react'
import { Navigate, useLocation } from 'react-router-native';
import useAuth from '../../Hooks/useAuth';


export default function PrivateRoute({ children, ...rest }) {
    const { user, isLoading } = useAuth();
    let location = useLocation();

    if (isLoading) {
        return (<NativeBaseProvider>
            <Spinner size="lg" accessibilityLabel="Loading posts" />
        </NativeBaseProvider>)
    }
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
}
