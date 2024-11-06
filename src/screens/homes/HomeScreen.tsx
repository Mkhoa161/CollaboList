import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { globalStyles } from '../../styles/globalStyles'
import RowComponent from '../../components/RowComponent'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import TitleComponent from '../../components/TitleComponent'
import { colors } from '../../constants/colors'
import CardComponent from '../../components/CardComponent'
import { Add, ColorSwatch, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import TagComponent from '../../components/TagComponent'
import SpaceComponent from '../../components/SpaceComponent'
import CircularComponent from '../../components/CircularComponent'
import CardImageComponent from '../../components/CardImageComponent'
import AvatarGroup from '../../components/AvatarGroup'
import ProgressBarComponent from '../../components/ProgressBarComponent'
import auth from '@react-native-firebase/auth'
import firestore, { Timestamp } from '@react-native-firebase/firestore'
import { TaskModel } from '../../models/TaskModel'

const HomeScreen = ({navigation}: any) => {
  
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    getNewTask();
  }, []);

  const getNewTask = async () => {
    setIsLoading(true);

    await firestore().collection('task').orderBy('dueDate').limit(3).onSnapshot(snap => {
        if (snap.empty){
            console.log(`tasks not found`);
        } else{
            const items: TaskModel[] = [];
            snap.forEach((item: any) => 
                items.push({
                    id: item.id,
                    ...item.data(),
                }),
            );

            setIsLoading(false);
            setTasks(items);
        }
    })
  }

  return (
    <View style={{flex: 1}}>
        <Container isScroll>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <Element4 size={24} color={colors.desc}/>
                    <Notification size={24} color={colors.desc}/>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent>
                    <View style={{flex: 1}}>
                        <TextComponent text={`hi, ${user?.email}`} />
                        <TitleComponent text='Be productive today'/>
                    </View>
                    <TouchableOpacity onPress={async () => auth().signOut()}>
                        <Logout size={22} color='coral'/>
                    </TouchableOpacity>
                </RowComponent>   
            </SectionComponent>    
            <SectionComponent>
                <RowComponent 
                    styles={[globalStyles.inputContainer]} 
                    onPress={() => navigation.navigate('SearchScreen')}>
                    <TextComponent color='#696B6F' text='Search task'/>
                    <SearchNormal1 size={20} color={colors.desc}/>
                </RowComponent>
            </SectionComponent>  
            <SectionComponent>
                <CardComponent>
                    <RowComponent>
                        <View style={{flex: 1}}>
                            <TitleComponent text='Task progress'/>
                            <TextComponent text='30/40 tasks done'/>
                            <SpaceComponent height={12}/>
                            <RowComponent justify='flex-start'>
                                <TagComponent text='March 22'/>
                            </RowComponent>
                        </View>
                        <View>
                            <CircularComponent value={80}/>
                        </View>
                    </RowComponent>
                </CardComponent>
            </SectionComponent>
            {
                isLoading ? <ActivityIndicator /> : tasks.length > 0 ? <SectionComponent>
                <RowComponent styles={{alignItems:'flex-start'}}>
                <View style={{flex:1}}>
                    {tasks[0] && 
                            <CardImageComponent 
                                onPress={() => {navigation.navigate("TaskDetail", {
                                id: (tasks[0] as any).id,
                            })}}>
                                <TouchableOpacity 
                                    onPress={() => {}}
                                    style={[globalStyles.iconContainer]}>
                                    <Edit2 size={20} color={colors.white} />
                                </TouchableOpacity>
                                <TitleComponent text={tasks[0].title} size={18}/>
                                <TextComponent text={tasks[0].description} size={13}/>
                                <View style={{marginVertical: 34}}>
                                    {tasks[0].uids && <AvatarGroup uids={tasks[0].uids}/>}
                                    {tasks[0].progress && <ProgressBarComponent percent='70%' color='#0AACFF' size='large'/>}
                                </View>
                                <TextComponent 
                                    text={`Due, ${(tasks[0].dueDate as unknown as Timestamp).toDate()}`} 
                                    size={12} 
                                    color={colors.desc}/>
                            </CardImageComponent>
                    }
                    </View>    
                    <SpaceComponent width={16}/>
                    <View style={{flex:1}}>
                        {
                            tasks[1] && 
                                <CardImageComponent
                                    onPress={() => {navigation.navigate("TaskDetail", {
                                    id: (tasks[1] as any).id,
                                    color:'rgba(33,150,243,0.9)'
                                    })}}
                                    color='rgba(33,150,243,0.9)'>
                                    <TouchableOpacity 
                                        onPress={() => {}}
                                        style={[globalStyles.iconContainer]}>
                                        <Edit2 size={20} color={colors.white} />
                                    </TouchableOpacity>
                                    <TitleComponent text={tasks[1].title} size={18}/>
                                    <View style={{marginVertical: 24}}>
                                        {
                                            tasks[1].uids && <AvatarGroup uids={tasks[1].uids}/>
                                        }
                                        {
                                            tasks[1].progress && <ProgressBarComponent percent='40%' color='#A2F068'/>
                                        }
                                    </View>
                                </CardImageComponent>
                        }
                        <SpaceComponent height={16}/>
                        {
                            tasks[2] && 
                                <CardImageComponent
                                    onPress={() => {navigation.navigate("TaskDetail", {
                                        id: (tasks[2] as any).id,
                                        color:'rgba(18,181,122,0.9)'
                                        })}} 
                                    color='rgba(18,181,122,0.9)'>
                                    <TouchableOpacity 
                                        onPress={() => {}}
                                        style={[globalStyles.iconContainer]}>
                                        <Edit2 size={20} color={colors.white} />
                                    </TouchableOpacity>
                                    <TitleComponent text={tasks[2].title} size={17}/>
                                    <TextComponent text={tasks[2].description} size={13}/>
                                </CardImageComponent>
                        }
                    </View>
                </RowComponent>
            </SectionComponent> : <></>
            }
            <SpaceComponent height={16}/>
            <SectionComponent>
                <TitleComponent text='Urgent tasks'/>
                <CardComponent>
                    <RowComponent>
                        <CircularComponent value={40} radius={32} size={20}/>
                        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                            <TextComponent text='Handle API Calls'/>
                        </View>
                    </RowComponent>
                </CardComponent>
            </SectionComponent>
        </Container>
        <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                top: 0,
                left: 0,
                padding: 20,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddNewTask')} activeOpacity={1} style={[globalStyles.row, {backgroundColor: colors.blue, padding: 10, borderRadius: 100, width: '80%'}]}>
                    <TextComponent text='Add new task' flex={0}/>
                    <Add size={22} color={colors.white}/>
                </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeScreen