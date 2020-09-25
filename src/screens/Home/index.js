import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faHeart,
  faCommentDots,
  faPlay,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import BottomTabNavigator from '../../components/BottomTabNavigator';

import videos from '../../Data/Videos/videos';

import {
  styles,
  NewsByFollowing,
  NewsByFollowingText,
  NewsByFollowingTextBold,
  ContentRight,
  ContentRightUser,
  ContentRightUserImage,
  ContentRightUserPlus,
  ContentRightHeart,
  ContentRightViews,
  ContentRightComment,
  ContentRightWhatsApp,
  ContentRightWhatsAppImage,
  ContentRightText,
  ContentLeftBottom,
  ContentLeftBottomNameUser,
  ContentLeftBottomNameUserText,
  ContentLeftBottomDescription,
  ContentLeftBottomMusic,
} from './styles';

export default function Home({navigation}) {
  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width, height} = Dimensions.get('window');

  const onChangeImage = (index) => {
    console.log(index);
    setCurrentIndex(index);
    setPaused(false);
  };
  return (
    <View style={{height}}>
      <Swiper
        automaticallyAdjustContentInsets={true}
        showsPagination={false}
        onIndexChanged={onChangeImage}
        index={0}
        loop={false}
        horizontal={false}>
        {videos.map((singledata, index) => (
          <SafeAreaView key={singledata.id}>
            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <Video
                resizeMode="cover"
                repeat
                source={singledata.url}
                paused={index !== currentIndex || paused ? true : false}
                style={{width: width, height: height}}
                currentIndex={currentIndex}
                muted={currentIndex == index ? false : true}
                // fullscreen={true}
              />
            </TouchableOpacity>
          </SafeAreaView>
        ))}
      </Swiper>
      <BottomTabNavigator
        background="transparent"
        colorIcon="#FFF"
        colorTitle="#FFF"
        navigation={navigation}
      />
    </View>
  );
}
