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
} from "native-base"
import { useParams } from 'react-router-native';
import useAuth from '../Hooks/useAuth';
import { AirbnbRating } from 'react-native-ratings';
import { Alert, BackHandler, ToastAndroid } from 'react-native'
import Header from '../Shared/Header';

export default function ProductDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [description, setDescription] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);

    const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);

                const desc = data?.details?.split("=");
                setDescription(desc)

            })

    }, [url])

    const handleAddToCart = () => {
        const data = {};
        data.product = products._id;
        data.orderName = products.name;
        data.price = products.cost;
        data.image = products.image;
        data.email = user?.email;
        data.quantity = quantity;

        fetch('https://gentle-fortress-91581.herokuapp.com/addToCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    ToastAndroid.show("Successfully Added", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("opps! Something wrong", ToastAndroid.SHORT);
                }
            }).catch(error => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "Something wrong" : error.message}`, ToastAndroid.SHORT);
            })

    }

    const quantityManage = (value) => {

        if (value === true) {
            const values = quantity + 1;
            setQuantity(values);
        }
        else {
            if (quantity > 1) {
                const values = quantity - 1;
                setQuantity(values);
            }
        }




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
            <Header></Header>
            <Center flex={1} px="3">
                <ScrollView >


                    {products.image ? <VStack space={2} alignItems="center" safeAreaTop my={6}>
                        <AspectRatio mt="-6" w="100%" ratio={2 / 2}>
                            <Image
                                w="100%"
                                source={{
                                    uri: products?.image,
                                }}
                                alt="image"
                            />

                        </AspectRatio>

                    </VStack> :
                        <HStack ml={3} space={2} alignItems="center">
                            <Spinner size="lg" accessibilityLabel="Loading posts" />
                            <Heading color="primary.400" fontSize="md">
                                Image Loading
                            </Heading>
                        </HStack>
                    }
                    <HStack justifyContent="flex-start" >
                        <Heading color="#3f000f" mb="5" size="2xl">{products?.name}</Heading>
                        <Text bold color="violet.500">{products?.offfer}% OFF</Text>
                    </HStack>



                    <Heading mb="2" size="lg">Key Features</Heading>
                    <View mb="3">{
                        description?.map(description => <Text color="#78716c" ml="4" key={description}><Text color="#d946ef" bold>~ </Text> {description}</Text>)
                    }
                    </View>
                    <AirbnbRating
                        count={5}
                        showRating={false}
                        defaultRating={products?.rating}
                        size={20}
                    />

                    <HStack mt="2" mb="2" justifyContent="space-between" alignItems="center">
                        <Heading color="#3f000f" size="2xl">{products?.cost} TK</Heading>
                        <HStack alignItems="center" space={1} justifyContent="center">
                            <Text mr="1" onPress={() => quantityManage(true)} fontSize={35} fontWeight={"bold"}>+</Text>
                            <Text borderRadius="full" px="8" fontSize={20} fontWeight={"bold"} borderWidth="2" borderColor="violet.500">{quantity}</Text>
                            <Text ml="1" mr="5" onPress={() => quantityManage(false)} mt="-2" fontSize={35} fontWeight={"bold"}>-</Text>
                        </HStack>
                    </HStack>
                    <Button onPress={handleAddToCart} size="sm"  >
                        Add to Cart
                    </Button>

                    <Center>  <Heading mt="3" mb="2" size="lg">Description</Heading></Center>
                    <Text textAlign="justify">
                        {products?.moreDetails}
                    </Text>


                </ScrollView>

            </Center>
        </NativeBaseProvider>

    )
}
