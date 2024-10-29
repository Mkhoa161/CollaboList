import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'
import { fontFamilies } from '../constants/fontFamilies'
import firestore from '@react-native-firebase/firestore'

interface Props {
    uids: string[]
}

const AvatarGroup = (props: Props) => {
  const [users, setUsers] = useState<any[]>([]);
  const {uids} = props;
  const imageUrl = 'https://static.wikia.nocookie.net/fourworldseries/images/5/5f/Monkey_D._Luffy.png/revision/latest?cb=20170520203023';
  const imageStyle = {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };

  useEffect(() => {
    getUsers(uids);
  }, [])

  const getUsers = async (uids: string[]) => {
    try{
        const userPromises = uids.map((id) =>
            firestore().doc(`users/${id}`).get()
        );
        const userSnapshots = await Promise.all(userPromises);

        const userData = userSnapshots
            .filter((snap) => snap.exists) // filter out non-existent docs
            .map((snap) => ({ id: snap.id, ...snap.data() }));

        setUsers(userData);
    } catch(error){
        console.log(error);
    }
  }

  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
        {uids && uids?.length > 0 && (users.map((item, index) => 
            index < 3 && 
                (item.name ? (<View 
                                key={`images${index}`} 
                                style={[imageStyle, {marginLeft: index > 0 ? -10 : 0, alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 4, backgroundColor: '#696B6F'}]}>
                                <TextComponent text={item.name.charAt(0)} flex={0}/>        
                            </View>) : (<Image 
                                        source={{uri: imageUrl}} 
                                        key={`images${index}`}
                                        style={[
                                            imageStyle,
                                            {
                                                marginLeft: index > 0 ? -10 : 0,
                                            }
                                        ]}/>))
        ))}

        {uids.length > 3 && (
            <View style={[imageStyle, {
                backgroundColor: 'coral',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                marginLeft: -10,
            }]}>
                <TextComponent 
                    flex={0} 
                    styles={{
                        lineHeight: 19,
                    }}
                    font={fontFamilies.bold}
                    text={`+${uids.length - 3 > 9 ? 9 : uids.length - 3}`}/>
            </View>
        )}
    </RowComponent>
  )
}

export default AvatarGroup