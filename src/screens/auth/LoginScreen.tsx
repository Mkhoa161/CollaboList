import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import TextComponent from '../../components/TextComponent'
import SectionComponent from '../../components/SectionComponent'
import { useHandler } from 'react-native-reanimated'
import TitleComponent from '../../components/TitleComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import InputComponent from '../../components/InputComponent'
import { Lock, Sms } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import SpaceComponent from '../../components/SpaceComponent'
import ButtonComponent from '../../components/ButtonComponent'
import { globalStyles } from '../../styles/globalStyles'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({navigation}: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const handleLoginWithEmail = async () => {
    if (!email || !password){
        setErrorText('Please enter your email and password');
    } else{
        setIsLoading(true)
        setErrorText('')
        
        await auth().signInWithEmailAndPassword(email, password).then(userCredential => {
            const user = userCredential.user;
            setIsLoading(false);
        }).catch((error: any)=>{
            setIsLoading(false);
            setErrorText(error.message);
        })
    }
  };

  return (
    <Container>
        <SectionComponent styles={{
            justifyContent: 'center',
            flex: 1,
        }}>
            <TitleComponent 
                text='Login' 
                size={32} 
                font={fontFamilies.bold} 
                styles={{textTransform: "uppercase", flex: 0, textAlign: 'center'}}
            />

            <View style={{marginVertical: 20}}>
                <InputComponent 
                    value={email} 
                    onChange={val => setEmail(val)}
                    prefix={<Sms size={20} color={colors.desc}/>}
                    placeholder='Email'
                    title='Email'
                    allowClear
                />
                <SpaceComponent height={5}/>
                <InputComponent 
                    value={password} 
                    onChange={val => setPassword(val)}
                    prefix={<Lock size={20} color={colors.desc}/>}
                    placeholder='Password'
                    title='Password'
                    isPassword
                />

                {errorText && <TextComponent text={errorText} color='coral'/>}
            </View>
            <ButtonComponent 
                isLoading={isLoading}
                title='Login' 
                onPress={handleLoginWithEmail} color={colors.blue} styles={{padding: 8, borderRadius: 14}}/>
            
            <SpaceComponent height={20}/>
            <Text style={[globalStyles.text, {textAlign: 'center'}]}>
                You don't have an account?{' '} 
                <Text style=
                    {{color: 'coral'}} 
                    onPress={() => navigation.navigate('SignUpScreen')}>
                        Create an account
                </Text>
            </Text>
        </SectionComponent>
    </Container>
  )
}

export default LoginScreen