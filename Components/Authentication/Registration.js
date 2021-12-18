import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { useNavigate } from 'react-router-native';
import useAuth from '../Hooks/useAuth';
import { Heading, Spinner, HStack, NativeBaseProvider } from "native-base"
import Header from '../Shared/Header';

export default function Registration() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, registerUser, isLoading } = useAuth();


    const handleSignUp = e => {
        registerUser(email, password, name, navigate);

    }
    const loginTrue = () => {
        ToastAndroid.show(' Successfully Signed in!', ToastAndroid.SHORT);
    }
    return (<NativeBaseProvider>
        <Header></Header>
        <View style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            {user?.email && loginTrue()}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('/login')}

                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Already Signed Up?  Login</Text>
                </TouchableOpacity>
            </View>
            {isLoading && <HStack ml={3} space={2} alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading posts" />
                <Heading color="primary.400" fontSize="md">
                    Loading
                </Heading>
            </HStack>}
        </View>
    </NativeBaseProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
        ,
        borderColor: '#3ccfdd',
        borderWidth: 1
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})