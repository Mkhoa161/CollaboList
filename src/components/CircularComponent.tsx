import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';

interface Props{
    color?: string,
    value: number,
    maxValue?: number,
    radius?: number,
    size?: number,
}

const CircularComponent = (props: Props) => {

  const {color, value, maxValue, radius, size} = props;

  return (
    <CircularProgress 
        radius={radius ?? 46}
        value={value} 
        valueSuffix={'%'}
        activeStrokeColor={color ?? colors.blue}
        inActiveStrokeColor={'#3C444A'}
        progressValueColor={colors.text}
        progressValueFontSize={size ?? 32}
        progressValueStyle={{
            fontFamily: fontFamilies.semiBold,
        }}
    />
  )
}

export default CircularComponent