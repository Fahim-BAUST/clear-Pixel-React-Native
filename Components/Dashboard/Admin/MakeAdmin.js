import React, { useEffect, useState } from 'react'

import {
    VStack,
    Image,
    ScrollView,
    Heading,
    Center,
    NativeBaseProvider,
    AspectRatio,
    HStack,
    Spinner,
    Text,
    Button,
    View,
    Divider,
    TextArea
} from "native-base"
import { StyleSheet, TextInput, ToastAndroid, TouchableOpacity, Alert, BackHandler } from 'react-native'
import useAuth from '../../Hooks/useAuth';

export default function MakeAdmin() {
    const [email, setEmail] = useState('');
    const { token } = useAuth();


    const [load, setLoad] = useState(false);

    const onSubmit = () => {
        Alert.alert(
            "Confirmation",
            "Are You sure You want add?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => makeAdminForAndroid() }
            ]
        );

    }

    const makeAdminForAndroid = () => {
        setLoad(true)
        const user = { email };
        fetch('https://gentle-fortress-91581.herokuapp.com/user/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (data.modifiedCount) {
                    setLoad(false)

                    ToastAndroid.show("Successfully done", ToastAndroid.SHORT);

                } else {
                    setLoad(false)
                    ToastAndroid.show("Something wrong.", ToastAndroid.SHORT);

                }
            }).catch((error) => {
                setLoad(false)
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);

            })

    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    return (
        <NativeBaseProvider>

            <View w="300" alignItems={"center"} mt="8" mb="55">
                {load && <HStack ml={3} space={2} alignItems="center">
                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                    <Heading color="primary.400" fontSize="md">
                        Loading
                    </Heading>
                </HStack>}
                <View alignItems={"center"}>
                    <Heading mb="5" color="#3f000f" mb="5" size="2xl">Make Admin</Heading>
                </View>

                <ScrollView>


                    <TextInput
                        placeholder="Enter Email Address(g@gmail.com)... "
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}

                    />

                    <View alignItems="center">
                        <TouchableOpacity
                            onPress={onSubmit}

                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </NativeBaseProvider >
    )
}
const styles = StyleSheet.create({

    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
        borderColor: '#3ccfdd',
        borderWidth: 1,
        marginBottom: 15,
        marginHorizontal: 15,
        fontWeight: "bold",
        color: "black"
    },
    buttonContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#0782F9',

        padding: 15,
        borderRadius: 20,
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
    }
})
