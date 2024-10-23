import { View, Text, Touchable, TouchableOpacity, TextStyle, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    title: string,
    onPress: () => void,
    isLoading?: boolean,
    styles?: StyleProp<ViewStyle>,
    color?: string,
}

const ButtonComponent = (props: Props) => {

  const {title, onPress, styles, isLoading, color} = props;
  return (
    <TouchableOpacity 
        onPress={onPress} 
        disabled={isLoading}
        style={[
            {
                backgroundColor: isLoading ? colors.gray : color ? color : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
            },
            styles,
        ]}
    >
        {
            isLoading ? (
                <ActivityIndicator/> 
            ) : ( 
                <TextComponent 
                    color={color === colors.blue ? colors.white : colors.blue}
                    text={title}
                    font={fontFamilies.semiBold}
                    size={16}
                    flex={0}
                    styles={{textTransform: 'uppercase'}}
                /> 
            )}
        
    </TouchableOpacity>
  )
}

export default ButtonComponent