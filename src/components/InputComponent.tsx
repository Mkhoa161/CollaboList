import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Eye, EyeSlash } from 'iconsax-react-native';

interface Props{
    value: string,
    onChange: (val: string) => void,
    placeholder?: string,
    title?: string,
    prefix?: ReactNode,
    affix?: ReactNode,
    allowClear?: boolean,
    multiple?: boolean,
    numberOfLines?: number,
    isPassword?: boolean,
}

const InputComponent = (props: Props) => {
  
  const {value, onChange, placeholder, title, prefix, affix, allowClear, multiple, numberOfLines, isPassword} = props;
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title}/>}
        <RowComponent 
            styles={[
                globalStyles.inputContainer,
                {
                    marginTop: title? 8 : 0,
                    minHeight: multiple && numberOfLines ? 32 * numberOfLines : 32,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    alignItems: 'flex-start',
                },
            ]}>
            
            {prefix && prefix}
            <View style={{flex: 1, paddingLeft: prefix ? 8 : 0, paddingRight: affix ? 8 : 0, minHeight: 23}}>
                <TextInput 
                    style={[globalStyles.text, {margin: 0, padding: 0, flex: 1}]}
                    placeholder={placeholder ?? ''} 
                    placeholderTextColor={'#676767'}
                    value={value} 
                    onChangeText={(val: string) => onChange(val)}
                    multiline={multiple}
                    numberOfLines={numberOfLines}
                    textAlignVertical='top'
                    secureTextEntry={isPassword ? !showPassword : false}
                    autoCapitalize='none'
                />
            </View>
            {affix && affix}

            {allowClear && 
                <TouchableOpacity onPress={() => onChange('')}>
                    <AntDesign name='close' size={20} color={colors.white}/>
                </TouchableOpacity>
            }

            {isPassword && <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                <EyeSlash size={20} color={colors.desc}/> : 
                <Eye size={20} color={colors.desc}/>}
                </TouchableOpacity>}
        </RowComponent>
    </View>
  )
}

export default InputComponent