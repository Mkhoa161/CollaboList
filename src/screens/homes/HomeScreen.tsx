import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
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

const HomeScreen = ({navigation}: any) => {
  
  const user = auth().currentUser;

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
            <SectionComponent>
                <RowComponent styles={{alignItems:'flex-start'}}>
                    <View style={{flex:1}}>
                        <CardImageComponent>
                            <TouchableOpacity 
                                onPress={() => {}}
                                style={[globalStyles.iconContainer]}>
                                <Edit2 size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TitleComponent text='UX Design'/>
                            <TextComponent text='Task management mobile app' size={13}/>
                            <View style={{marginVertical: 34}}>
                                <AvatarGroup />
                                <ProgressBarComponent percent='70%' color='#0AACFF' size='large'/>
                            </View>
                            <TextComponent 
                                text='Due, 2023 March 03' 
                                size={12} 
                                color={colors.desc}/>
                        </CardImageComponent>
                    </View>
                    <SpaceComponent width={16}/>
                    <View style={{flex:1}}>
                        <CardImageComponent color='rgba(33,150,243,0.9)'>
                            <TouchableOpacity 
                                onPress={() => {}}
                                style={[globalStyles.iconContainer]}>
                                <Edit2 size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TitleComponent text='API Payment'/>
                            <View style={{marginVertical: 24}}>
                                <AvatarGroup />
                                <ProgressBarComponent percent='40%' color='#A2F068'/>
                            </View>
                        </CardImageComponent>
                        <SpaceComponent height={16}/>
                        <CardImageComponent color='rgba(18,181,122,0.9)'>
                            <TouchableOpacity 
                                onPress={() => {}}
                                style={[globalStyles.iconContainer]}>
                                <Edit2 size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TitleComponent text='Update work'/>
                            <TextComponent text='Revision home page' size={13}/>
                        </CardImageComponent>
                    </View>
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16}/>
            <SectionComponent>
                <TitleComponent text='Urgent tasks'/>
                <CardComponent>
                    <RowComponent>
                        <CircularComponent value={40} radius={32} size={20}/>
                        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                            <TextComponent text='Title of task'/>
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