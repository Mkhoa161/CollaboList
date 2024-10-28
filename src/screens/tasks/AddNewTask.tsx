import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextComponent from '../../components/TextComponent'
import Container from '../../components/Container'
import { TaskModel } from '../../models/TaskModel'
import SectionComponent from '../../components/SectionComponent'
import InputComponent from '../../components/InputComponent'
import { AttachSquare, User } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import DateTimePickerComponent from '../../components/DateTimePickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'
import DropdownPicker from '../../components/DropdownPicker'
import { SelectModel } from '../../models/SelectModel'
import firestore from '@react-native-firebase/firestore'
import TitleComponent from '../../components/TitleComponent'
import DocumentPicker, {DocumentPickerResponse, DocumentPickerOptions} from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: []
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [attachmentsUrl, setAttachmentsUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //createFakeData();
    handleGetAllUsers();
  }, [])

  const createFakeData = async () => {
    // Fetch users from JSONPlaceholder
    let users: any = [];
    
    try{
      // await fetch('https://jsonplaceholder.typicode.com/users')
      // .then((response) => response.json())
      // .then((json) => users = json);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users = await response.json(); // Wait for the JSON to be parsed
      console.log(users); // Now this will log the correct data
    } catch (error) {
      console.error("Error importing users:", error);
    }

    for (const user of users){
      const userData: any = {}; // Create an object to hold user data

      // Loop through each key in the user object to create fields dynamically
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          userData[key] = user[key]; // Assign the key-value pair to userData
        }
      }

      try {
        await firestore().collection("users").add(userData)
      } catch (error){
        console.log("error when adding data", error)
      }
    }
  }

  const handleGetAllUsers = async () => {
    await firestore().collection('users').get().then(snap => {

      if (snap.empty){
        console.log('Users data not found')
      } else{
        const items: SelectModel[] = []
        snap.forEach(item => {
          items.push({
            label: item.data().name,
            value: item.id,
          });
        })

        setUserSelect(items);
      }
    }).catch(error => {
      console.log(`Cannot get users, ${error.message}`)
    })
  }

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);

  }

  const handleAddNewTask = async () => {
    const data = {...taskDetail, fileUrls: attachmentsUrl};

    await firestore().collection('task').add(data).then(() => {
      console.log('A new task has been addeed!');
      navigation.goBack();
    }).catch(error => console.log(error));
  }

  const handlePickerDocument = () => {
    DocumentPicker.pick({}).then(res => {
      setAttachments(res);
      console.log(res);

      res.forEach(item => handleUploadFileToStorage(item));
    }).catch(error => {
      console.log(error);
    })
  }

  const handleUploadFileToStorage = async (item: DocumentPickerResponse) => {
    const filename = item.name ?? `file${Date.now()}`;
    const path = `documents/${filename}`;

    const items = [...attachmentsUrl];

    const destPath = `${RNFS.TemporaryDirectoryPath}/${filename}`;
    await RNFS.copyFile(item.uri, destPath);

    await storage().ref(path).putFile(destPath);

    await storage().ref(path).getDownloadURL().then(url => {
      items.push(url);
      setAttachmentsUrl(items);
    }).catch(error => {console.log(error)});
  }

  console.log(attachmentsUrl);

  return (
    <View style={{flex: 1}}>
      <Container back title="Add new task" isScroll>
        <SectionComponent>
          <InputComponent 
            value={taskDetail.title}
            onChange={val => handleChangeValue('title', val)}
            title='Title'
            allowClear
            placeholder='Title of task'
            prefix={<User size={22} color={colors.white}/>}
          />

          <InputComponent 
            value={taskDetail.description}
            onChange={val => handleChangeValue('description', val)}
            title='Description'
            allowClear
            placeholder='Content'
            multiple={true}
            numberOfLines={3}
          />

          <DateTimePickerComponent 
            selected={taskDetail.dueDate}
            onSelect={(val) => handleChangeValue('dueDate', val)}
            placeholder='Select Date'
            type='date'
            title='Due date'
          />

          <RowComponent>
            <View style={{flex: 1}}>
              <DateTimePickerComponent 
                selected={taskDetail.start}
                type='time'
                onSelect={val => handleChangeValue('start', val)}
                title='Start'/> 
            </View>
            <SpaceComponent width={14}/>
            <View style={{flex: 1}}>
              <DateTimePickerComponent
                type='time'
                selected={taskDetail.end} 
                onSelect={val => handleChangeValue('end', val)}
                title='End'/> 
            </View>
          </RowComponent>

          <DropdownPicker
            multiple
            title="Members" 
            selected={taskDetail.uids} 
            items={userSelect}
            onSelect={val => handleChangeValue('uids', val)}
          />

          <View>
            <RowComponent justify='flex-start' onPress={handlePickerDocument}>
              <TitleComponent text='Attachments'/>
              <SpaceComponent width={8}/>
              <AttachSquare size={20} color={colors.white} style={{marginBottom: 2}}/>
            </RowComponent>

            {attachments.length > 0 && attachments.map((item, index) => 
              <RowComponent key={`attachment${index}`} styles={{paddingBottom: 10}}>
                <TextComponent text={item.name ?? ''}/>
              </RowComponent>
            )}
          </View>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent title='Save' color={colors.blue} styles={{borderRadius: 12}} onPress={() => handleAddNewTask()}/>
        </SectionComponent>
      </Container>
    </View>
  )
}

export default AddNewTask