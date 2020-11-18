import React from 'react'
import { View, Text } from 'react-native'

import BottomTabNavigator from '../../components/BottomTabNavigator';

const Inbox = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#737373"

        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#FFF"
            }}>Coming Soon !</Text>
            <BottomTabNavigator
                background="transparent"
                colorIcon="#FFF"
                colorTitle="#FFF"
                navigation={navigation}
            />
        </View>
    )
}

export default Inbox
