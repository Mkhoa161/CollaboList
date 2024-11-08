import { View, Text, Touchable, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Attachment } from '../models/TaskModel'
import { DocumentUpload } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import DocumentPicker, { DocumentPickerResponse, DocumentPickerOptions } from 'react-native-document-picker'
import TextComponent from './TextComponent'
import { globalStyles } from '../styles/globalStyles'
import TitleComponent from './TitleComponent'
import SpaceComponent from './SpaceComponent'
import { Slider } from '@miblanchard/react-native-slider'
import RowComponent from './RowComponent'
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs';

interface Props {
    onUpload: (file: Attachment) => void,
    size?: number,
}

const UploadFileComponent = (props: Props) => {
  const {onUpload, size} = props;
  const [file, setFile] = useState<DocumentPickerResponse>();
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0.5);
  const [attachmentFile, setAttachmentFile] = useState<Attachment>();

  useEffect(() => {
    file && handleUploadFileToStorage();
    //console.log(file)
  }, [file])

  useEffect(() => {
    if (attachmentFile){
        //console.log(attachmentFile);
        onUpload(attachmentFile);
        setIsVisibleModalUpload(false);
        setProgressUpload(0);
        setAttachmentFile(undefined);
    }
  }, [attachmentFile])

  const handleUploadFileToStorage = async () => {
    if (file){
        setIsVisibleModalUpload(true);
        const path = `/documents/${file?.name}`;

        const destPath = `${RNFS.TemporaryDirectoryPath}/${file?.name}`;
        await RNFS.copyFile(file.uri, destPath);

        const res = storage().ref(path).putFile(destPath);

        res.on('state_changed', task => {
            setProgressUpload(task.bytesTransferred/task.totalBytes)
        });

        res.then(() => {
            storage().ref(path).getDownloadURL().then(url => {
                const data: Attachment = {
                    url,
                    name: file.name ?? '',
                    size: file.size ?? 0,
                }
    
                setAttachmentFile(data);
            })
        })
        
        res.catch(error => console.log(error))
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  return (
    <>
        <TouchableOpacity onPress={() => DocumentPicker.pick({
            allowMultiSelection: false,
            type: ['application/pdf', DocumentPicker.types.doc, DocumentPicker.types.xls],
        }).then(res => {
            setFile(res[0]);
        })}>
            <DocumentUpload size={size ?? 24} color={colors.white}/>
        </TouchableOpacity>
        <Modal 
            visible={isVisibleModalUpload} 
            animationType='slide' 
            style={{flex: 1}}
            statusBarTranslucent
            transparent>
            <View style={[
                globalStyles.container, 
                {
                    backgroundColor: `${colors.gray}80`, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                },
                ]}>
                <View style={
                    {
                        margin: 20, 
                        width: Dimensions.get('window').width * 0.8, 
                        height: 'auto', 
                        padding: 12, 
                        borderRadius: 12,
                        backgroundColor: colors.white,
                    }}>
                    <TitleComponent text='Uploading' color={colors.bgColor}/>
                    <SpaceComponent height={20}/>
                    <View>
                        <TextComponent 
                            text={file?.name ?? ''} 
                            color={colors.bgColor}
                            flex={0}
                        />
                        <TextComponent 
                            text={`${formatFileSize(file?.size as number)} bytes`} 
                            color={colors.bgColor}
                            flex={0}
                        />
                        <RowComponent>
                            <View style={{flex: 1, marginRight: 12}}>
                                <Slider 
                                    value={progressUpload} 
                                    renderThumbComponent={() => null}
                                    trackStyle={{height: 6, borderRadius: 100}}
                                    minimumTrackTintColor={colors.success}
                                    maximumTrackTintColor={colors.desc}
                                />    
                            </View>
                            <TitleComponent 
                                text={`${Math.floor(progressUpload * 100)}%`}
                                color={colors.bgColor}
                            />
                        </RowComponent>
                    </View>
                </View>
            </View>
        </Modal>
    </>
    
  )
}

export default UploadFileComponent