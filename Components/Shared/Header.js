import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faHome, faShoppingCart, faTasks, faSignInAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import {
    Button, Center, NativeBaseProvider, Menu,
    HamburgerIcon,
    Box,
    Pressable,
    Avatar,
    HStack,
    VStack,

} from "native-base"
import { Link, useNavigate } from 'react-router-native'
import useAuth from '../Hooks/useAuth'



const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#e0ffff',
    },
    navBar: {
        backgroundColor: '#e0ffff',
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 20,
    },
    buttonText: {
        color: '#rgba(0, 0, 0, 0.45)',
        fontSize: 16,
        fontWeight: '900'

    },
    linkTestStyle: {
        fontWeight: 'bold'
    }
})


export default function Header() {
    let navigate = useNavigate();
    const { user, logout } = useAuth();
    return (
        <View>
            <NavBar style={styles}>
                <NavTitle >

                    <NativeBaseProvider>
                        <Box h="80%" w="90%" alignItems="flex-start">
                            <Menu
                                w="190"
                                style={{ marginTop: 50 }}
                                trigger={(triggerProps) => {
                                    return (
                                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                            <HamburgerIcon />
                                        </Pressable>
                                    )
                                }}
                            >

                                {user.email && <VStack space={6}>
                                    <Center>
                                        <Avatar
                                            bg="amber.500"
                                            source={{
                                                uri: user.photoURL || "https://i.ibb.co/d2d08MM/icon.png",
                                            }}
                                        >
                                        </Avatar>
                                        <Text style={{ fontSize: 20, marginBottom: 10 }}> Welcome {user?.displayName} </Text>
                                    </Center>

                                </VStack>}

                                <Menu.Item onPress={() => { navigate("/") }}>

                                    <HStack space={2}>
                                        <FontAwesomeIcon color='#f1abb7' icon={faHome} size={20} />
                                        <Text style={styles.linkTestStyle}>Home</Text>
                                    </HStack>

                                </Menu.Item>

                                <Menu.Item onPress={() => { navigate("/products") }}>

                                    <HStack space={2}>
                                        <FontAwesomeIcon color='#f1abb7' icon={faCamera} size={20} />
                                        <Text style={styles.linkTestStyle}>All Camera</Text>
                                    </HStack>

                                </Menu.Item>
                                {user?.email && <Menu.Item onPress={() => { navigate("/dashboard") }}>

                                    <HStack space={2}>
                                        <FontAwesomeIcon color='#f1abb7' icon={faTasks} size={20} />
                                        <Text style={styles.linkTestStyle}>Dashboard</Text>
                                    </HStack>

                                </Menu.Item>}

                                <Menu.Item onPress={() => { navigate("/aboutUs") }}>
                                    <HStack space={2}>
                                        <FontAwesomeIcon color='#f1abb7' icon={faAddressCard} size={20} />
                                        <Text style={styles.linkTestStyle}>About us</Text>
                                    </HStack>
                                </Menu.Item>
                                {user?.email ? <Menu.Item onPress={logout}>

                                    <HStack space={2}>
                                        <FontAwesomeIcon color='#f1abb7' icon={faSignInAlt} size={20} />

                                        <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: "#f1abb7", paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, borderRadius: 5 }}>Logout</Text>
                                    </HStack>

                                </Menu.Item>
                                    :
                                    <Menu.Item onPress={() => { navigate("/login") }}>

                                        <HStack space={2}>
                                            <FontAwesomeIcon color='#f1abb7' icon={faSignInAlt} size={20} />
                                            <Text style={{ fontSize: 16, fontWeight: "bold", backgroundColor: "#f1abb7", paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, borderRadius: 5 }}>Login</Text>
                                        </HStack>

                                    </Menu.Item>

                                }



                            </Menu>
                        </Box>
                    </NativeBaseProvider>


                </NavTitle>
                <NavTitle >

                    <Text onPress={() => { navigate("/home") }} style={styles.title}> Clear Pixel</Text>

                </NavTitle>
                <NavGroup>

                    <NavButton style={{ marginTop: 4 }}>
                        <NavButtonText style={styles.buttonText}>
                            <FontAwesomeIcon onPress={() => { navigate("/placeOrder") }} color='#ffc107' icon={faShoppingCart} size={25} />
                        </NavButtonText>
                    </NavButton>

                </NavGroup>
            </NavBar>
        </View>
    )
}


