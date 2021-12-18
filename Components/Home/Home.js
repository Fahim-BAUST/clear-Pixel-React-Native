import React, { useEffect, useState } from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
import { Image, AppRegistry, View, Text, Heading, Center, NativeBaseProvider, Flex, VStack, ScrollView, Spinner, Button, HStack } from "native-base"
import Product from '../Products/Product';
import { Link } from 'react-router-native';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { ToastAndroid, BackHandler, Alert } from 'react-native'
import Header from '../Shared/Header';


export default function Home() {
    const [sony, setSony] = useState([]);
    const [nikon, setNikon] = useState([]);
    const [panasonic, setPanasonic] = useState([]);
    const [review, setReview] = useState([]);

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const sony = data.filter(data => data?.category === 'sony')
                setSony(sony);
                const nikon = data.filter(data => data?.category === 'nikon')
                setNikon(nikon);
                const panasonic = data.filter(data => data?.category === 'panasonic')
                setPanasonic(panasonic);
            }).catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
            })

    }, [])

    useEffect(() => {
        fetch('https://gentle-fortress-91581.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReview(data))
            .catch((error) => {
                ToastAndroid.show(`opps! ${error.message === "Failed to fetch" ? "No network connection" : error.message}`, ToastAndroid.SHORT);
            })

    }, [])

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
        <><NativeBaseProvider>
            <Header></Header>
            <ScrollView>
                <ImageSlider
                    data={[{ img: 'https://image.freepik.com/free-vector/camera-accessory_1284-13130.jpg' },
                    { img: 'https://image.freepik.com/free-photo/close-up-professional-digital-camera-tripod_169016-10266.jpg' },
                    { img: 'https://image.freepik.com/free-photo/female-vlogger-recording-cooking-related-broadcast-home_53876-14733.jpg' },

                    { img: 'https://image.freepik.com/free-photo/professional-camera-glasses_23-2147717335.jpg' }
                    ]}

                    autoPlay={true}
                    closeIconColor="#fff"
                />

                <NativeBaseProvider>

                    <View px="4" pt="10" >
                        <Text borderRadius="5" pl="3" borderLeftWidth="5" borderColor="cyan.500" fontWeight="bold" fontSize={25}>Choose Your Camera with{" \n"}
                            <Text color="emerald.400" fontSize={30}>Clear Pixel</Text>
                        </Text>
                    </View>
                </NativeBaseProvider>

                <NativeBaseProvider>
                    <Center>
                        <View px="4" mt="10" mb="30" >

                            <HStack alignItems="center" justifyContent="space-between">
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleLeft} size={25} /></Text>
                                <Text textAlign="center" fontWeight="bold" color="yellow.900" fontSize={30}>SONY ({sony.length})</Text>
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleRight} size={25} /></Text>
                            </HStack>
                            <ScrollView horizontal={true} >

                                {sony.length === 0 ? <HStack ml={3} space={2} alignItems="center">
                                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                                    <Heading color="primary.400" fontSize="md">
                                        Loading
                                    </Heading>
                                </HStack>
                                    :
                                    sony.map(product => <Product
                                        key={product?._id}
                                        product={product}
                                    ></Product>)
                                }

                            </ScrollView>
                        </View>
                    </Center>
                </NativeBaseProvider>
                <NativeBaseProvider>
                    <Center>
                        <View px="4" mt="5" mb="30" >
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleLeft} size={25} /></Text>
                                <Text textAlign="center" fontWeight="bold" color="yellow.900" fontSize={30}>NIKON ({nikon.length})</Text>
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleRight} size={25} /></Text>
                            </HStack>
                            <ScrollView horizontal={true}>

                                {nikon.length === 0 ? <HStack ml={6} space={2} alignItems="center">
                                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                                    <Heading color="primary.400" fontSize="md">
                                        Loading
                                    </Heading>
                                </HStack>
                                    :
                                    nikon.map(product => <Product
                                        key={product?._id}
                                        product={product}
                                    ></Product>)
                                }

                            </ScrollView>
                        </View>
                    </Center>
                </NativeBaseProvider>
                <NativeBaseProvider>
                    <Center>
                        <View px="4" mt="5" >
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleLeft} size={25} /></Text>
                                <Text textAlign="center" fontWeight="bold" color="yellow.900" fontSize={30}>PANASONIC ({panasonic.length})</Text>
                                <Text><FontAwesomeIcon color='#ca8a04' icon={faAngleDoubleRight} size={25} /></Text>
                            </HStack>
                            <ScrollView horizontal={true}>

                                {panasonic.length === 0 ? <HStack ml={12} space={2} alignItems="center">
                                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                                    <Heading color="primary.400" fontSize="md">
                                        Loading
                                    </Heading>
                                </HStack>
                                    :
                                    panasonic.map(product => <Product
                                        key={product?._id}
                                        product={product}
                                    ></Product>)
                                }

                            </ScrollView>
                        </View>
                    </Center>
                </NativeBaseProvider>
                <Center>
                    <Link to='/products'>
                        <Text underline fontSize={16} color="yellow.900" fontWeight="bold">LOAD MORE CAMERAS?</Text>
                    </Link>
                </Center>

                <View>
                    <Text borderRadius="5" ml="5" pl="3" mt="10" borderLeftWidth="5" borderColor="cyan.500" fontWeight="bold" fontSize={25}>
                        <Text color="emerald.400" fontSize={30}>Our Happy Customers</Text>
                    </Text>
                    <ScrollView horizontal={true}>

                        {review.length === 0 ? <HStack ml={20} space={2} >
                            <Spinner size="lg" accessibilityLabel="Loading posts" />
                            <Heading color="primary.400" fontSize="md">
                                Loading
                            </Heading>
                        </HStack> :
                            review.map(review => <View shadow="4" key={review._id} alignItems="center" w="300" mb="50" ml="5" mt="6" borderRadius="md" bg="primary.100" p="5">
                                <Text fontWeight="bold" fontSize={20}>{review?.name}</Text>
                                <Text>{review?.message?.slice(0, 150)}</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Bad", "Good", "Amazing", "Unbelievable"]}
                                    defaultRating={review?.rating}
                                    size={15}
                                />
                            </View>)
                        }

                    </ScrollView>

                </View>

            </ScrollView>
        </NativeBaseProvider>




        </>
    )
}

