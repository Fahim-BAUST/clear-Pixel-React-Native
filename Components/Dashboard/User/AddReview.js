

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

export default function AddReview() {
    const { user } = useAuth();
    const [rating, setRating] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);

    const onSubmit = () => {
        Alert.alert(
            "Confirmation",
            "Are You sure You want to add?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => placeReviewForAndroid() }
            ]
        );

    }

    const placeReviewForAndroid = () => {
        setLoad(true)
        const loginData = {}
        loginData.name = user?.displayName;
        loginData.rating = rating;
        loginData.message = message;
        fetch('https://gentle-fortress-91581.herokuapp.com/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setLoad(false)

                    ToastAndroid.show("Your review  has been placed.", ToastAndroid.SHORT);

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

            <View w="300" alignItems={"center"} mt="20">
                {load && <HStack ml={3} space={2} alignItems="center">
                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                    <Heading color="primary.400" fontSize="md">
                        Loading
                    </Heading>
                </HStack>}
                <View alignItems={"center"}>
                    <Heading mb="5" color="#3f000f" mb="5" size="2xl">Add Review</Heading>
                </View>
                <TextInput

                    value={user.displayName}
                    editable={false}

                    style={styles.input}

                />


                <TextInput

                    placeholder="Your rating"
                    value={rating}
                    onChangeText={text => setRating(text)}
                    style={styles.input}

                />
                <TextArea
                    onChangeText={text => setMessage(text)}
                    h={20}
                    placeholder="Enter Comments"
                    w={{
                        base: "70%",
                        md: "25%",
                    }}
                />

                <View mb="5" alignItems="center">
                    <TouchableOpacity
                        onPress={onSubmit}

                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                </View>

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