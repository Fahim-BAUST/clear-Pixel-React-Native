import { Heading, NativeBaseProvider, Text, View } from 'native-base'
import React from 'react'

import Header from '../Shared/Header'

export default function AboutUs() {
    return (
        <NativeBaseProvider>
            <Header></Header>
            <View>
                <View alignItems={"center"}>
                    <Heading mb="5" color="#3f000f" mb="5" size="2xl">About us</Heading>
                </View>
                <Text py="3" px="3" style={{ textAlign: "justify" }}> <Text fontSize="xl" bold>We believe everyone</Text>  is a creator. Our mission is to inspire, educate and equip to make dreams a reality.
                    Our Vision
                    Be an integral part of every creators success story.

                    Our Pledge
                    Keep you inspired and connected to our pros and your peers.

                    We See It Your Way
                    If youre going to manifest your creative vision, you need the right equipment. At Clear Pixel, our store has been an icon for New York Citys creatives since 1974. Read more about our history.

                    Shop Clear Pixel for a powerhouse lineup of cameras, lenses, cinematography gear, studio lighting, tripods, pro audio, computers, printers, and every cutting-edge accessory you need to create triumphant work. </Text>
            </View>
        </NativeBaseProvider>
    )
}
