import React from "react"
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Entypo'
import { openDrawer } from '@app/Global'

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const Menu = () => (
    <TouchableOpacity hitSlop={hitSlop} onPress={openDrawer}>
        <Icon name="menu" size={30} color="#fff" />
    </TouchableOpacity>
)
export { Menu }