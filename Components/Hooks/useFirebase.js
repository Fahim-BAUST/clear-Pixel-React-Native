import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, getIdToken } from "firebase/auth";
import initializeFirebase from '../Authentication/firebase.init';
import { ToastAndroid } from 'react-native'

// initialize firebase app
initializeFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to the database 
                saveUser(email, name, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                    console.log(error.message);
                    ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);

                });
                navigate('/');
            })
            .catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);

            })
            .catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);

            })
            .finally(() => setIsLoading(false));
    }


    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://gentle-fortress-91581.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
            .catch(error => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
            })
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            ToastAndroid.show('Successfully LOGOUT', ToastAndroid.SHORT);
        }).catch((error) => {
            ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {

        const user = { email, displayName };
        fetch('https://gentle-fortress-91581.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then()
            .catch(error => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
            })

    }

    return {
        user,
        isLoading,
        token,
        registerUser,
        loginUser,
        logout,
        admin
    }
}

export default useFirebase;