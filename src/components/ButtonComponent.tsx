import { View, Text, Touchable, TouchableOpacity, TextStyle, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    title: string,
    onPress: () => void,
    styles?: StyleProp<ViewStyle>,
}

const ButtonComponent = (props: Props) => {

  const {title, onPress, styles} = props;
  return (
    <TouchableOpacity 
        onPress={onPress} 
        style={[
            {
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            },
            styles,
        ]}
    >
        <TextComponent 
            color={colors.blue}
            text={title}
            font={fontFamilies.regular}
            size={16}
            flex={0}
        />
    </TouchableOpacity>
  )
}

export default ButtonComponent