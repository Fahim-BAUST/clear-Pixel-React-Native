import React from 'react'
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
    Avatar,
    Divider,
} from "native-base"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function CartItem(props) {
    const { _id, image, orderName, quantity, price } = props.product
    return (

        <NativeBaseProvider>
            <View>
                <HStack alignItems={"center"} justifyContent="space-evenly">
                    <Avatar
                        bg="amber.500"
                        source={{
                            uri: image,
                        }}
                    >
                        AK
                    </Avatar>
                    <Heading w="70" size="xs">{orderName}</Heading>
                    <Heading size="sm">{quantity}</Heading>
                    <Heading size="sm">{(quantity) * (price)}</Heading>

                    <FontAwesomeIcon onPress={() => props.handleDeleteSingleItem(_id)} color='#991b1b' icon={faTrash} size={20} />


                </HStack>
                <Divider thickness="2" my="2" />
            </View>

        </NativeBaseProvider>

    )
}
