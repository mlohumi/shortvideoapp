import React, { useState } from 'react';
import { View, Text, Alert, Button, ActivityIndicator } from 'react-native';

import { RNS3 } from 'react-native-s3-upload';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

import { addPost } from '../../actions/post'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BottomTabNavigator from '../../components/BottomTabNavigator';

import { Container } from './styles';

const Uploads = ({ navigation, addPost }) => {
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
          let num = Math.floor((Math.random() * 9999999) + 1000000)
          setLoader(true);
          const file = {
            uri: 'file://' + photo.path,
            name: `${num}` + `video.mp4`,
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
          console.log("1")
          let response = await RNS3.put(file, awsoptions);
          setLoader(false);
          let text = response.body.postResponse.location

          addPost({ text })

          console.log("2")
          console.log(response.body.postResponse, 'RESPONSE');
          if (response?.body?.postResponse?.location) {
            alert('Upload Successful')

            // post to text in post api
          }
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

Uploads.propTypes = {
  addPost: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

export default connect(null, { addPost })(Uploads)
