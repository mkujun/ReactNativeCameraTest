import React, {useEffect, useCallback, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const App = () => {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [openImageBase64, setBase64] = useState("");

  useEffect(() => {
    if (pickerResponse !== null) {
      const {didCancel} = pickerResponse;

      if (!didCancel) {
        setBase64(pickerResponse.assets[0].base64);
      }
    }

  }, [pickerResponse])

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestCameraPermissionAndroid();
    }
  }, [])

  const requestCameraPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onImageLibraryOpen = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, setPickerResponse);
  })

  const onTakeImage = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, setPickerResponse);
  })

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}> 
      <View style={{flex: 3}}>
          <Image
            style={{width: 300, height: 300}}
            source={{
              uri: 'data:image/png;base64,' + openImageBase64,
            }}
          >
          </Image>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity onPress={() => {onTakeImage()}}>
          <Text>Click to take image!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {onImageLibraryOpen()}}>
          <Text>Click to open image!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
