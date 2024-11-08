import { View, Text, ScrollView, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { globalStyles } from '../../styles/globalStyles';
import TextComponent from '../../components/TextComponent';
import SectionComponent from '../../components/SectionComponent';
import RowComponent from '../../components/RowComponent';
import { AddSquare, ArrowLeft2, CalendarEdit, Clock, CloudAdd, DocumentCloud, DocumentUpload, Size, TickCircle } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import firestore, { Timestamp } from '@react-native-firebase/firestore'
import { Attachment, TaskModel } from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import AvatarGroup from '../../components/AvatarGroup';
import { HandleDateTime } from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fontFamilies } from '../../constants/fontFamilies';
import { Slider } from '@miblanchard/react-native-slider';
import ButtonComponent from '../../components/ButtonComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import { calcFileSize } from '../../utils/calcFileSize';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color} : {id: string, color?: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [subtask, setSubTasks] = useState<any>([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    getTaskDetail();
  }, [id]);

  useEffect(() => {
    if (taskDetail){
        setProgress(taskDetail.progress ?? 0);
        setAttachments(taskDetail.attachments);
    }
  }, [taskDetail])

  useEffect(() => {
    if (progress != taskDetail?.progress || 
        attachments.length !== taskDetail.attachments.length){
        setIsChanged(true);
    } else{
        setIsChanged(false);
    }
  }, [progress, taskDetail, attachments])

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

  const handleUpdateTask = async () => {
    const data = {...taskDetail, progress, attachments, updateAt: Date.now()};
    await firestore().doc(`task/${id}`).update(data).then(() => {
        Alert.alert('Task updated')
    }).catch(error => console.log(error))
  }

  console.log(attachments)
  return taskDetail ? (
    <>
        <ScrollView style={[{flex: 1, backgroundColor: colors.bgColor}]}>
            <SectionComponent styles={{
                    backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)', 
                    paddingVertical: 20, 
                    paddingTop: 60, 
                    borderBottomLeftRadius: 20, 
                    borderBottomRightRadius: 20}}>
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
            <SectionComponent>
                <TitleComponent text='Description' size={22}/>
                <CardComponent bgColor={colors.bgColor} styles={{
                    borderWidth: 1,
                    borderColor: colors.gray,
                    borderRadius: 12,
                    marginTop: 12,
                    paddingVertical: 15,
                }}>
                    <TextComponent text={taskDetail.description}/>
                </CardComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    <TitleComponent text='Files and Links' styles={{flex: 1}}/>
                    <UploadFileComponent onUpload={(file) => file && setAttachments([...attachments, file])}/>
                </RowComponent>
                {attachments.map((item, index) => 
                <View key={`file${index}`} style={{justifyContent: 'flex-start', marginBottom: 8}}>
                    <TextComponent flex={0} text={item.name} size={15}/>
                    <TextComponent flex={0} text={calcFileSize(item.size)} size={12}/>
                </View>)}
            </SectionComponent>
            <SpaceComponent height={6}/>
            <SectionComponent>
                <RowComponent>
                    <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: colors.success,
                        marginRight: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            backgroundColor: colors.success,
                            width: 14, 
                            height: 14,
                            borderRadius: 100,
                        }}/>
                    </View>
                    <TextComponent text='Progress' styles={{flex: 1}} font={fontFamilies.medium} size={18}/>
                </RowComponent>
                <SpaceComponent height={12}/>
                <RowComponent>
                    <View style={{flex: 1}}>
                        <Slider 
                            value={progress}
                            onValueChange={val => setProgress(val[0])} 
                            thumbTintColor={colors.success} 
                            maximumTrackTintColor={colors.gray2}
                            minimumTrackTintColor={colors.success}
                            trackStyle={{height: 10, borderRadius: 100}}
                            thumbStyle={{borderColor: colors.white, borderWidth: 2}}
                        />
                    </View>
                    <SpaceComponent width={20}/>
                    <TextComponent 
                        text={`${Math.floor(progress * 100)}%`}
                        font={fontFamilies.bold}
                        size={18}
                        flex={0}
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    <TitleComponent text='Sub tasks' size={20} styles={{flex: 1}}/>
                    <TouchableOpacity>
                        <AddSquare size={24} color={colors.success} variant='Bold'/>
                    </TouchableOpacity>
                </RowComponent>
                <SpaceComponent height={12}/>
                {
                    // Array.from({length: 3}).map((item, index) => <CardComponent key={`subtask${index}`} styles={{marginBottom: 12}}>
                    //     <RowComponent>
                    //         <TickCircle variant='Bold' color={colors.success} size={22}/>
                    //         <SpaceComponent width={8}/>
                    //         <TextComponent text='arg'/>
                    //     </RowComponent>
                    // </CardComponent>)
                }
            </SectionComponent>
        </ScrollView>
        {
            isChanged && 
            <View style={{
                position: 'absolute',
                bottom: 20,
                right: 20, 
                left: 20,
            }}>
                <ButtonComponent styles={{borderRadius: 100}} color={colors.blue} title='Update' onPress={handleUpdateTask}/>
            </View>
        }
    </>
  ) : (
    <></>
  )
}

export default TaskDetail