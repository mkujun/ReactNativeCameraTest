import React, {useEffect, useCallback, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const App = () => {
  const [imagePickerResponse, setImagePickerResponse] = useState(null);
  const [takeImagePickerResponse, setTakeImagePickerResponse] = useState(null);

  const [openImageBase64, setOpenImageBase64] = useState("");
  const [takeImageBase64, setTakeImageBase64] = useState("");

  // imagePicker
  useEffect(() => {
    if (imagePickerResponse !== null) {
      const {didCancel} = imagePickerResponse;

      if (!didCancel) {
        setOpenImageBase64(imagePickerResponse.assets[0].base64);
      }
    }
  }, [imagePickerResponse])

  useEffect(() => {
    requestCameraPermission();
  }, [])

  // takeImagePicker
  useEffect(() => {
    if (takeImagePickerResponse !== null) {
      const {didCancel} = takeImagePickerResponse;

      if (!didCancel) {
        setTakeImageBase64(takeImagePickerResponse.assets[0].base64);
      }
    }
  }, [takeImagePickerResponse])


  const requestCameraPermission = async () => {
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

    launchImageLibrary(options, setImagePickerResponse);
  })

  const onTakeImage = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, setTakeImagePickerResponse);
  })

  return (
    <View style={{flex: 1}}> 
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {onImageLibraryOpen()}}>
          <Text>Click to open image!</Text>
          <Image
            style={{width: 300, height: 300}}
            source={{
              uri: 'data:image/png;base64,' + openImageBase64,
            }}
          >
          </Image>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {onTakeImage()}}>
          <Text>Click to take image!</Text>
          <Image
            style={{width: 300, height: 300}}
            source={{
              uri: 'data:image/png;base64,' + takeImageBase64,
            }}
          >
          </Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
