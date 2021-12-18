import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, ToastAndroid, TouchableOpacity, Alert, BackHandler } from 'react-native'
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ManageProduct() {
    const { user } = useAuth();

    const [prod, setProd] = useState([]);

    const url = `https://gentle-fortress-91581.herokuapp.com/products`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProd(data);
            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);
            })

    }, [prod]);


    const handleDeleteSingleItem = (id) => {

        Alert.alert(
            "Confirmation",
            "Are You sure You want to delete?",
            [
                { text: "Delete One", onPress: () => deleteOne(id) }
                , {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ]
        );


    }

    const deleteOne = (id) => {
        const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
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


            <View ml="4" mb="10">

                <View alignItems={"center"}>
                    <Heading mb="5" color="#3f000f" mb="5" size="2xl">Manage Products</Heading>
                </View>
                <ScrollView>

                    {prod.length === 0 ?
                        <View alignItems={"center"}>
                            <Heading mb="5" color="#dc2626" mb="5" size="xs">Wait A moment</Heading>
                        </View>
                        : prod.map(product => <View>
                            <HStack alignItems={"center"} justifyContent="space-between">
                                <Image
                                    size={"sm"}
                                    resizeMode="cover"
                                    source={{
                                        uri: product.image,
                                    }}
                                    alt={"Alternate Text "}
                                />
                                <Heading ml="5" mr="5" size="sm">{product.name}</Heading>
                                <TouchableOpacity onPress={() => handleDeleteSingleItem(product._id)}>

                                    <View>
                                        <FontAwesomeIcon color='#991b1b' icon={faTrash} size={25} />

                                    </View>
                                </TouchableOpacity>



                            </HStack>
                            <Divider thickness="2" my="2" />
                        </View>
                        )}
                </ScrollView>

            </View>
            <Divider thickness="2" my="2" />

        </NativeBaseProvider >
    )
}
