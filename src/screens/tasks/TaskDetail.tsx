import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { globalStyles } from '../../styles/globalStyles';
import TextComponent from '../../components/TextComponent';
import SectionComponent from '../../components/SectionComponent';
import RowComponent from '../../components/RowComponent';
import { ArrowLeft2, CalendarEdit, Clock } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import firestore, { Timestamp } from '@react-native-firebase/firestore'
import { TaskModel } from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvatarGroup from '../../components/AvatarGroup';
import { HandleDateTime } from '../../utils/handleDateTime';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color} : {id: string, color?: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();

  useEffect(() => {
    getTaskDetail();
  }, []);

  const getTaskDetail = () => {
    if (!id){
        console.log('Empty id');
        return;
    }
    
    firestore().doc(`task/${id}`).onSnapshot((snap: any) => {
        if (snap.exists){
            setTaskDetail({
                id,
                ...snap.data(),
            })
        } else{
            console.log('Task detail not found');
        }
    })
  }

  return taskDetail ? (
    <ScrollView style={[{flex: 1}]}>
        <SectionComponent styles={{backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)', paddingVertical: 20, paddingTop: 60}}>
            <RowComponent justify='flex-start'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft2 size={28} color={colors.text}/>
                </TouchableOpacity>
                <SpaceComponent width={13}/>
                <TitleComponent size={22} text={taskDetail.title} styles={{flex: 1, marginTop: 5}}/>
            </RowComponent>
            <SpaceComponent height={30}/>
            <TextComponent text='Due date'/>
            <RowComponent>
                <RowComponent styles={{flex: 1}}>
                    <Clock size={22} color={colors.text}/>
                    <SpaceComponent width={8}/>
                    <TextComponent styles={{marginTop: 3}} text={`${HandleDateTime.GetHour((taskDetail.start as unknown as Timestamp).toDate())} - ${HandleDateTime.GetHour((taskDetail.end as unknown as Timestamp).toDate())}`}/>
                </RowComponent>
                <SpaceComponent width={8}/>
                <RowComponent styles={{flex: 1}}>
                    <CalendarEdit size={22} color={colors.text}/>
                    <SpaceComponent width={8}/>
                    <TextComponent styles={{marginTop: 3}} text={`${HandleDateTime.DateString((taskDetail.dueDate as unknown as Timestamp).toDate())}`}/>
                </RowComponent>
                <RowComponent styles={{flex: 1}} justify='flex-end'>
                    <AvatarGroup uids={taskDetail.uids}/>
                </RowComponent>
            </RowComponent>
        </SectionComponent>
    </ScrollView> 
  ) : (
    <></>
  )
}

export default TaskDetail