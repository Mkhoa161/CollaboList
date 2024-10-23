import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import TextComponent from '../../components/TextComponent'
import Container from '../../components/Container'
import { TaskModel } from '../../models/TaskModel'
import SectionComponent from '../../components/SectionComponent'
import InputComponent from '../../components/InputComponent'
import { User } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import DateTimePickerComponent from '../../components/DateTimePickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'

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

  const handleChangeValue = (id: string, value: string | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);

  }

  const handleAddNewTask = async () => {
    console.log(taskDetail)
  }

  return (
    <Container back title="Add new task">
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
          multiple
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
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent title='Save' onPress={() => handleAddNewTask()}/>
      </SectionComponent>
    </Container>
  )
}

export default AddNewTask