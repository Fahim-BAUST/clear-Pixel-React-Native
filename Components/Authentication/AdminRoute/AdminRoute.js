import { NativeBaseProvider, Spinner } from 'native-base';
import React from 'react'
import { Navigate, useLocation } from 'react-router-native';
import useAuth from '../../Hooks/useAuth';


export default function AdminRoute({ children, ...rest }) {
    const { user, admin, isLoading } = useAuth();
    let location = useLocation();

    if (isLoading) {
        return (<NativeBaseProvider>
            <Spinner size="lg" accessibilityLabel="Loading posts" />
        </NativeBaseProvider>)
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
}
