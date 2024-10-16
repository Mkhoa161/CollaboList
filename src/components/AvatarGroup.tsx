import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors } from '../constants/colors'
import { fontFamilies } from '../constants/fontFamilies'

const AvatarGroup = () => {
  const uidsLength = 10;
  const imageUrl = 'https://static.wikia.nocookie.net/fourworldseries/images/5/5f/Monkey_D._Luffy.png/revision/latest?cb=20170520203023';
  const imageStyle = {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };

  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
        {Array.from({length: uidsLength}).map((item, index) => 
            index < 3 && <Image 
                            source={{uri: imageUrl}} 
                            key={`images${index}`}
                            style={[
                                imageStyle,
                                {
                                    marginLeft: index > 0 ? -10 : 0,
                                }
                            ]}/>,
        )}

        {uidsLength > 5 && (
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
                    text={`+${uidsLength - 3 > 9 ? 9 : uidsLength - 3}`}/>
            </View>
        )}
    </RowComponent>
  )
}

export default AvatarGroup