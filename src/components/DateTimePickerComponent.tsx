import { View, Text, Modal, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    type?: 'date' | 'time' | 'datetime',
    title?: string,
    placeholder?: string,
    selected?: Date,
    onSelect: (val: Date) => void,
}

const DateTimePickerComponent = (props: Props) => {
  const {selected, onSelect, placeholder, type, title} = props;

  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);

  const [date, setDate] = useState(selected ?? new Date());

  function displayDate(selected: Date){
    const month = selected.getMonth() + 1;
    const date = selected.getDate();
    const year = selected.getFullYear();

    const displayMonth = month < 10 ? '0' + `${month}` : `${month}`;
    const displayDate = date < 10 ? '0' + `${date}` : `${date}`;
    return `${displayMonth}/${displayDate}/${year}`;
  }

  function displayTime(selected: Date){
    let hours = selected.getHours();
    const minutes = selected.getMinutes();

    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12; // convert to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine into a formatted string
    return `${hours}:${formattedMinutes} ${ampm}`; 
  }

  return (
    <>
        <View style={{marginBottom: 16}}>
            {title && <TitleComponent text={title}/>}
            <RowComponent 
                onPress={() => setIsVisibleModalDateTime(true)}
                styles={[
                    globalStyles.inputContainer, 
                    {marginTop: title ? 6 : 0, paddingVertical: 16}]}>
                <TextComponent 
                    flex={1} 
                    text={selected ? type === 'time' ? displayTime(selected) : displayDate(selected) : placeholder ? placeholder : ''}
                    color={selected ? colors.text : '#676767'}    
                />
                <ArrowDown2 size={20} color={colors.text}/>
            </RowComponent>
        </View>
        <Modal 
            visible={isVisibleModalDateTime}
            transparent
            animationType='slide'>
                <View style={{
                    flex: 1, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                                backgroundColor: 'white',
                                margin: 20, 
                                width: '90%',
                                padding: 20,
                                borderRadius: 20,}}>
                        <TextComponent text={type === 'date' ? 'Select Date' : 'Select Time'} color={colors.blue} flex={0} font={fontFamilies.semiBold} size={16}/>
                        <View>
                            <DatePicker 
                                mode={type ? type : 'time'} 
                                date={date} 
                                onDateChange={val => setDate(val)}
                                locale='us'
                            />
                        </View>
                        <SpaceComponent height={20}/>
                        <ButtonComponent 
                            title='Confirm'
                            onPress={() => {
                                onSelect(date)
                                setIsVisibleModalDateTime(false)
                            }}
                        />
                        <SpaceComponent height={10}/>
                        <ButtonComponent 
                            title='Close'
                            onPress={() => setIsVisibleModalDateTime(false)}
                        />
                    </View>
                </View>    
        </Modal>
    </>
  )
}

export default DateTimePickerComponent