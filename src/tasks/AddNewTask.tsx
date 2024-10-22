import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from '../components/TextComponent'
import Container from '../components/Container'

const AddNewTask = () => {
  return (
    <Container back title="Add new task">
        <TextComponent text="Add new task"></TextComponent>
    </Container>
  )
}

export default AddNewTask