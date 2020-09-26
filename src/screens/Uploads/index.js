import React, {useState} from 'react';
import {View, Text, Alert, Button, ActivityIndicator} from 'react-native';

import {RNS3} from 'react-native-s3-upload';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

import BottomTabNavigator from '../../components/BottomTabNavigator';

import {Container} from './styles';

export default function Uploads({navigation}) {
  const [loader, setLoader] = useState(false);
  const handleUploadFiles = (e) => {
    e.preventDefault();

    let options = {
      mediaType: 'video',
      noData: true,
    };

    //Pick video from phone gallery
    ImagePicker.launchImageLibrary(options, async (res) => {
      if (res) {
        let photo = res;
        console.log(photo, 'GOT URI');

        try {
          setLoader(true);
          const file = {
            uri: 'file://' + photo.path,
            name: 'video.mp4',
            type: 'video/mp4',
          };

          let awsoptions = {
            keyPrefix: 'demo/',
            bucket: 'shortvideoapp',
            region: 'ap-south-1',
            accessKey: 'AKIAVJ2AWXTRJWOTVNF5',
            secretKey: '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',
            successActionStatus: 201,
          };

          let response = await RNS3.put(file, awsoptions);
          setLoader(false);

          //TODO : Message after uploading file - "Upload Successful"

          console.log(response.body.postResponse, 'RESPONSE');
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3');
          }
        } catch (error) {
          console.log(error, 'API CALL ERROR');
        }
      }
    });
  };

  return (
    <Container>
      <View>
        {loader ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <View>
            <Button
              onPress={handleUploadFiles}
              title="Click to upload video"></Button>
          </View>
        )}
      </View>
      <BottomTabNavigator
        background="#010101"
        colorIcon="#FFF"
        colorTitle="#FFF"
        navigation={navigation}
      />
    </Container>
  );
}
