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
import { StyleSheet, TextInput, ToastAndroid, TouchableOpacity, Alert, BackHandler, Picker } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faSmileWink, faSpinner, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../Hooks/useAuth';

export default function MyOrder() {
    const { user, isLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedValue, setSelectedValue] = useState("java");
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch(`https://gentle-fortress-91581.herokuapp.com/allOrders/${user.email}`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);
            });
    }, [orders]);



    const handleDeleteItem = (id) => {
        Alert.alert(
            "Confirmation",
            "Are You sure You want to delete?",
            [
                { text: "Delete One", onPress: () => deleteOne(id) },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ]
        );
    }
    const deleteOne = (id) => {
        const url = `https://gentle-fortress-91581.herokuapp.com/allOrders/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    ToastAndroid.show("Successfully Deleted", ToastAndroid.SHORT);

                    const remainingOrders = orders.filter((order) => order?._id !== id);
                    setOrders(remainingOrders);

                } else {
                    ToastAndroid.show("Something wrong", ToastAndroid.SHORT);
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
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <NativeBaseProvider>
            <View ml="7" mt="10" alignItems="center">
                <Heading mb="5" color="#3f000f" size="2xl">Your Orders</Heading>
            </View>
            {load && <HStack ml={3} space={2} alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading posts" />
                <Heading color="primary.400" fontSize="md">
                    Loading
                </Heading>
            </HStack>}
            <ScrollView>

                <ScrollView horizontal={true}>
                    <View>
                        {orders.length === 0 ? <HStack ml={3} space={2} alignItems="center">
                            <Spinner size="lg" accessibilityLabel="Loading posts" />
                            <Heading color="primary.400" fontSize="md">
                                Loading
                            </Heading>
                        </HStack> :
                            orders.map(order => <View
                                key={order._id}>
                                <HStack alignItems={"center"}>
                                    <Heading w="20" size="sm">* {order?.name}</Heading>

                                    <VStack ml="5" w="40">
                                        {order?.order?.map(order => <Text key={order?._id}> {order.orderName} (Qty={order?.quantity}) </Text>)}
                                    </VStack>
                                    <Heading ml="5" w="20" size="sm">${order?.totalPrice}</Heading>


                                    <Heading w="20" size="sm">{order?.payment ? "paid" : "Not paid yet"}</Heading>
                                    <Heading ml="5" w="20" size="sm">
                                        {order?.orderStatus === "Pending" && (
                                            <FontAwesomeIcon color='#f1abb7' icon={faSpinner} size={20} />

                                        )}
                                        {order?.orderStatus === "Shipped" && (
                                            <FontAwesomeIcon color='#f1abb7' icon={faTruck} size={20} />
                                        )}
                                        {order?.orderStatus === "Delivered" && (
                                            <FontAwesomeIcon color='#f1abb7' icon={faSmileWink} size={20} />
                                        )}
                                        {order?.orderStatus === "Approved" && (
                                            <FontAwesomeIcon color='#f1abb7' icon={faCheckCircle} size={20} />
                                        )}
                                        {order?.orderStatus}{" "}

                                    </Heading>

                                    <TouchableOpacity onPress={() => handleDeleteItem(order._id)}>
                                        <View ml="8" mr="5">
                                            <FontAwesomeIcon color='#991b1b' icon={faTrash} size={30} />
                                        </View>

                                    </TouchableOpacity>



                                </HStack>
                                <Divider thickness="2" my="2" />



                            </View>)
                        }


                    </View>

                </ScrollView>
            </ScrollView>

        </NativeBaseProvider>
    )
}