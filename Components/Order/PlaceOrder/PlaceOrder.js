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
} from "native-base"
import useAuth from '../../Hooks/useAuth';
import { StyleSheet, TextInput, ToastAndroid, TouchableOpacity, Alert, BackHandler } from 'react-native'
import CartItem from '../CartItem/CartItem';
import Header from '../../Shared/Header';

export default function PlaceOrder() {
    const { user } = useAuth();

    const [prod, setProd] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    const email = user.email;
    let sum = 0;

    const url = `https://gentle-fortress-91581.herokuapp.com/addToCart/cart/${email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProd(data);
                data.map(p => {
                    sum = sum + (parseInt(p.price) * parseInt(p.quantity));
                })
                const tax = (5 * sum) / 100;

                setTax(tax);
                setTotal(sum + tax);

            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);

            })

    }, [prod]);

    const handleDeleteSingleItem = (id) => {

        Alert.alert(
            "Confirmation",
            "Are You sure You want to delete?",
            [
                { text: "Delete One", onPress: () => deleteOne(id) },
                {
                    text: "DeleteAll",
                    onPress: () => deleteAll(user.email)
                }, {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ]
        );


    }

    const deleteOne = (id) => {
        const url = `https://gentle-fortress-91581.herokuapp.com/cart/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    ToastAndroid.show("Successfully Deleted", ToastAndroid.SHORT);

                    const remainingOrders = prod.filter((order) => order?._id !== id);
                    setProd(remainingOrders);

                } else {
                    ToastAndroid.show("Something wrong", ToastAndroid.SHORT);
                }
            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);
            })
    }

    const deleteAll = (email) => {
        const url = `https://gentle-fortress-91581.herokuapp.com/cartRemove/${email}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged === true) {
                    ToastAndroid.show("Successfully Deleted", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("Something wrong", ToastAndroid.SHORT);
                }
            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);

            })
    }

    const onSubmit = () => {
        Alert.alert(
            "Confirmation",
            "Are You sure You want to Order?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => placeOrderForAndroid() }
            ]
        );

    }

    const placeOrderForAndroid = () => {
        const data = {}
        data.name = user?.displayName;
        data.email = user?.email;
        data.address = address ? address : "not given";
        data.city = city ? city : "not given";
        data.phone = phone ? phone : "not given";
        data.order = prod;
        data.orderStatus = "Pending";
        data.totalPrice = total;

        fetch('https://gentle-fortress-91581.herokuapp.com/cartToOrders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {

                    ToastAndroid.show('Your order has been placed.', ToastAndroid.SHORT);

                } else {

                    ToastAndroid.show('Your order is canceled', ToastAndroid.SHORT);
                }
            }).catch((error) => {
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

        }

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

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
            <Header></Header>
            <ScrollView>
                <View >

                    <View alignItems={"center"}>
                        <Heading mb="5" color="#3f000f" mb="5" size="2xl">Your Orders</Heading>
                    </View>


                    {prod.length === 0 ?
                        <View alignItems={"center"}>
                            <Heading mb="5" color="#dc2626" mb="5" size="xs">Please order something first</Heading>
                        </View>
                        : prod.map(product => <CartItem
                            product={product}
                            handleDeleteSingleItem={handleDeleteSingleItem}
                        ></CartItem>
                        )}

                </View>
                <Divider thickness="2" my="2" />
                <View>
                    <HStack alignItems={"center"} justifyContent="space-evenly">

                        <Heading size="md">Tax: (5%)</Heading>
                        <Heading size="md"><Text color="#dc2626"> {tax} </Text>TK</Heading>

                    </HStack>
                    <HStack alignItems={"center"} justifyContent="space-evenly">

                        <Heading size="xl">Total Cost</Heading>
                        <Heading size="xl"> <Text color="#dc2626"> {total}</Text> TK</Heading>

                    </HStack>

                    <Divider thickness="2" my="2" />
                    <Divider thickness="2" my="2" />
                </View>

                <View>
                    <View alignItems={"center"}>
                        <Heading mb="5" color="#3f000f" mb="5" size="2xl">Place Order</Heading>


                    </View>
                    <TextInput

                        value={user.displayName}
                        editable={false}

                        style={styles.input}

                    />
                    <TextInput

                        value={user.email}
                        editable={false}
                        style={styles.input}

                    />

                    <TextInput
                        placeholder="Your Address"
                        value={address}
                        onChangeText={text => setAddress(text)}
                        style={styles.input}

                    />
                    <TextInput
                        placeholder="Your City"
                        value={city}
                        onChangeText={text => setCity(text)}
                        style={styles.input}


                    />
                    <TextInput
                        placeholder="Your Phone"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={styles.input}


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




            </ScrollView>
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
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#0782F9',
        width: '30%',
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