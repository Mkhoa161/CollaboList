import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { getEnforcing } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    children: ReactNode,
}

const SectionComponent = (props: Props) => {

    const {children} = props;
    return (
        <View style={[globalStyles.section]}>
            {children}
        </View>
    )
}

export default SectionComponent