import React, {useEffect, useCallback, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const App = () => {
  const [pickerResponse, setPickerResponse] = useState(null);

  useEffect(() => {
    console.log("pickerResponse", pickerResponse);
  }, [pickerResponse])

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
    <View>
      <TouchableOpacity onPress={() => {onImageLibraryOpen()}}>
        <Text>Click to open image!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {onTakeImage()}}>
        <Text>Click to take image!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
