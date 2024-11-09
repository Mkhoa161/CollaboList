import { View, Text, Modal, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/globalStyles';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import { colors } from '../constants/colors';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import firestore from '@react-native-firebase/firestore'

interface Props {
    visible: boolean,
    subTask?: any,
    onClose: () => void;
    taskId: string,
}

const initValue = {
    title: '',
    description: '',
    isCompleted: false,
}

const ModalAddSubTask = (props: Props) => {

  const {visible, subTask, onClose, taskId} = props;
  const [subTaskForm, setSubTaskForm] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setSubTaskForm(initValue);
    onClose();
}

const handleSaveToDatabase = async () => {
    const data = {
        ...subTaskForm,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        taskId,
    }

    setIsLoading(true);

    try{
        await firestore().collection('subTasks').add(data)
        console.log('Done')
        handleCloseModal();
        setIsLoading(false);
    } catch (error){
        console.log(error)
        setIsLoading(false);
    }
    
}

  return (
    <Modal visible={visible} style={[globalStyles.modal]} transparent animationType='slide'>
        <View style={[globalStyles.modalContainer]}>
            <View style={[globalStyles.modalContent, {backgroundColor: colors.gray}]}>
                <TitleComponent text='Add new Subtask'/>
                <View style={{paddingVertical: 16}}>
                    <InputComponent 
                        title='Title' 
                        placeholder='Title' 
                        value={subTaskForm.title} 
                        onChange={(val) => setSubTaskForm({...subTaskForm, title: val})}
                        color='#212121'
                        allowClear
                    />
                    <InputComponent 
                        title='Description' 
                        placeholder='Description' 
                        value={subTaskForm.description} 
                        onChange={(val) => setSubTaskForm({...subTaskForm, description: val})}
                        numberOfLines={3}
                        multiple
                        color='#212121'
                        allowClear
                    />

                </View>
                <RowComponent justify='center'>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <TextComponent text='Close' flex={0}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <ButtonComponent isLoading={isLoading} title='Save' onPress={handleSaveToDatabase} color={colors.blue} styles={{borderRadius: 12}}/>
                    </View>
                </RowComponent>
            </View>
        </View>
    </Modal>
    
  )
}

export default ModalAddSubTask