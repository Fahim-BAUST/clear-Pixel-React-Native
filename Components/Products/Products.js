import React, { useEffect, useState } from 'react'
import { Image, AppRegistry, View, Text, Heading, Center, NativeBaseProvider, Flex, VStack, ScrollView, Spinner, Button, HStack, IconButton } from "native-base"

import { ToastAndroid, TextInput, StyleSheet, BackHandler, Alert } from 'react-native'
import Product from './Product';
import { AntDesign } from "@expo/vector-icons"
import Header from '../Shared/Header';

export default function Products() {
    const [products, setProducts] = useState([])
    const [displayProducts, setDisplayProducts] = useState([]);
    const [text, setText] = useState('');

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);

            })

    }, [])


    const handleSearch = () => {

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));

        setDisplayProducts(matchedProducts);
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
    return (<NativeBaseProvider>
        <Header></Header>
        <Center>
            <View px="4" mt="5" mb="30" >
                <Text>Products found :{displayProducts.length} </Text>
                <TextInput
                    placeholder="Search your product"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={styles.input}

                />
                <View alignItems="center" mt="-2">
                    <IconButton
                        w="12"
                        mb="2"
                        onPress={handleSearch}
                        colorScheme="indigo"
                        key={"outline"}
                        variant={"outline"}
                        _icon={{
                            as: AntDesign,
                            name: "search1",
                        }}
                    />

                </View>



                <ScrollView  >

                    {displayProducts.length === 0 ? <HStack ml={3} space={2} alignItems="center">
                        <Spinner size="lg" accessibilityLabel="Loading posts" />
                        <Heading color="primary.400" fontSize="md">
                            Loading
                        </Heading>
                    </HStack>
                        :
                        displayProducts.map(product => <Product
                            key={product?._id}
                            product={product}
                        ></Product>)
                    }

                </ScrollView>
            </View>
        </Center>



    </NativeBaseProvider>

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
        marginBottom: 15
    }
})