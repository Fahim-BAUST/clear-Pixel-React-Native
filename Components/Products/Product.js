import React, { useState } from 'react'
import {
    Button,
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    NativeBaseProvider,
    VStack,
} from "native-base"
import { useNavigate } from 'react-router-native';
import useAuth from '../Hooks/useAuth';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ToastAndroid } from 'react-native'

export default function Product({ product }) {
    const { image, name, rating, details, offfer, cost, _id, category } = product;
    const [quantity, setQuantity] = useState(1);
    let navigate = useNavigate();

    const { user } = useAuth();

    const desc = details?.split("=");


    const handleAddToCart = () => {
        const data = {};
        data.product = _id;
        data.orderName = name;
        data.price = cost;
        data.image = image;
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

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box

                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700",
                    }}
                    _web={{
                        shadow: 4,
                        borderWidth: 0,
                    }}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                >
                    <Box >
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image
                                source={{
                                    uri: image,
                                }}
                                alt="image"
                            />
                        </AspectRatio>
                        {offfer && <Center
                            bg="violet.500"
                            _dark={{
                                bg: "violet.400",
                            }}
                            _text={{
                                color: "warmGray.50",
                                fontWeight: "800",
                                fontSize: "xs",
                            }}
                            position="absolute"
                            bottom="0"
                            px="3"
                            py="1.5"
                        >
                            {`${offfer}% OFF`}
                        </Center>}
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>

                            <Heading size="md" ml="-1">
                                {name}
                            </Heading>

                            <AirbnbRating
                                count={5}
                                showRating={false}
                                defaultRating={rating}
                                size={20}
                            />
                            <Text
                                fontSize="xs"
                                _light={{
                                    color: "violet.500",
                                }}
                                _dark={{
                                    color: "violet.400",
                                }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                            >
                                Catagory: {category}
                            </Text>
                        </Stack>

                        <VStack>
                            {desc?.map(description => <Text color="light.400" key={description}>* {description}</Text>)}
                        </VStack>
                        <Text fontSize={20} fontWeight="bold">
                            {cost} TK
                        </Text>
                        <HStack mt="-5" alignItems="center" space={1} justifyContent="center">
                            <Text mr="1" onPress={() => quantityManage(true)} fontSize={35} fontWeight={"bold"}>+</Text>
                            <Text borderRadius="full" px="8" fontSize={20} fontWeight={"bold"} borderWidth="2" borderColor="violet.500">{quantity}</Text>
                            <Text ml="1" mr="5" onPress={() => quantityManage(false)} mt="-2" fontSize={35} fontWeight={"bold"}>-</Text>
                        </HStack>

                        <HStack mt="-5" alignItems="center" space={1} justifyContent="space-between">

                            <Button onPress={() => { navigate(`/productDetails/${_id}`); }} size="sm" variant="outline" >
                                Details
                            </Button>
                            {user?.email ? <Button onPress={handleAddToCart} size="sm" variant="outline" >
                                Add to Cart
                            </Button> :
                                <Button onPress={() => { navigate("/login") }} size="sm" variant="outline" >
                                    Login First
                                </Button>
                            }

                        </HStack>
                    </Stack>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}
