import { faHome, faJedi, faPlusCircle, faSignInAlt, faSitemap, faTasks, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    Menu,
    HamburgerIcon,
    Box,
    Pressable,
    Center,
    NativeBaseProvider,
    Text,
    HStack,
    Heading,
    View,
    Spinner,
} from "native-base"
import React, { useEffect } from 'react'
import { Alert, BackHandler } from "react-native";
import { Outlet, useNavigate } from "react-router-native"
import useAuth from "../../Hooks/useAuth";


export default function Dashboard() {
    const navigate = useNavigate();
    const { logout, admin, isLoading } = useAuth();

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

        return () => BackHandler.remove();
    }, []);
    return (
        <NativeBaseProvider bgColor="cyan.100">
            {isLoading ? <HStack ml={3} space={2} alignItems="center">
                <Spinner size="lg" accessibilityLabel="Loading posts" />
                <Heading color="primary.400" fontSize="md">
                    Loading
                </Heading>
            </HStack> : <Center bgColor="cyan.100" flex={1} px="3">
                <Box h="80%" w="90%" alignItems="flex-start">
                    <Menu
                        w="190"
                        trigger={(triggerProps) => {
                            return (
                                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                    <HStack alignItems="center">
                                        <HamburgerIcon />
                                        <Heading ml="2" size="lg">Dashboard</Heading>
                                    </HStack>


                                </Pressable>
                            )
                        }}
                    >
                        <Menu.Item onPress={() => { navigate("/") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faHome} size={20} />
                                <Text >Home</Text>
                            </HStack>
                        </Menu.Item>
                        {admin || <Menu.Item onPress={() => { navigate("/dashboard/myOrder") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faJedi} size={20} />
                                <Text >My Order</Text>
                            </HStack>
                        </Menu.Item>}
                        {admin || <Menu.Item onPress={() => { navigate("/dashboard/addReview") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faPlusCircle} size={20} />
                                <Text >Add Review</Text>
                            </HStack>
                        </Menu.Item>}
                        {admin && <Menu.Item onPress={() => { navigate("/dashboard/allOrder") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faTasks} size={20} />
                                <Text >Manage All Order</Text>
                            </HStack>
                        </Menu.Item>}
                        {admin && <Menu.Item onPress={() => { navigate("/dashboard/addProduct") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faSitemap} size={20} />
                                <Text >Add Product</Text>
                            </HStack>
                        </Menu.Item>}
                        {admin && <Menu.Item onPress={() => { navigate("/dashboard/manageProduct") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faTasks} size={20} />
                                <Text >Manage Product</Text>
                            </HStack>
                        </Menu.Item>}
                        {admin && <Menu.Item onPress={() => { navigate("/dashboard/makeAdmin") }}>
                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faUserPlus} size={20} />
                                <Text >Make Admin</Text>
                            </HStack>
                        </Menu.Item>}
                        <Menu.Item onPress={logout}>

                            <HStack space={2}>
                                <FontAwesomeIcon color='#f1abb7' icon={faSignInAlt} size={20} />

                                <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: "#f1abb7", paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, borderRadius: 5 }}>Logout</Text>
                            </HStack>

                        </Menu.Item>


                    </Menu>

                    <View >
                        <Outlet></Outlet>

                    </View>
                </Box>


            </Center>}

        </NativeBaseProvider>
    )
}
