import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import Video from 'react-native-video';
import Swiper from 'react-native-swiper';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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

// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'

const Home = ({ navigation, getPosts, post: { posts, loading } }) => {

  useEffect(() => {
    getPosts()
    console.log("using effect")
  }, [getPosts])

  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width, height } = Dimensions.get('window');

  // const onChangeImage = (index) => {
  //   console.log(index);
  //   setCurrentIndex(index);
  //   setPaused(false);
  // };

  // useEffect(() => {
  //   if props.NavigaIndex != current
  //     setPaused(true)
  // else
  //   true

  // }, [prop])
  posts.map((video, index) => {
    console.log(video._id, video.text)
  })

  return (

    <View style={{ height: height }}>

      <Swiper
        automaticallyAdjustContentInsets={true}
        showsPagination={false}
        onIndexChanged={(index) => {
          console.log(index, 'abc');
          setCurrentIndex(index), setPaused(false);
        }}
        index={0}
        loop={false}
        horizontal={false}>
        {posts.map((video, index) => (
          <SafeAreaView key={video._id}>
            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <Video
                resizeMode="cover"
                repeat
                source={{ uri: video.text }}
                // source={video.url}
                paused={index !== currentIndex || paused ? true : false}
                style={{ width: width, height: height }}
                currentIndex={currentIndex}
                muted={currentIndex == index ? false : true}
                bufferConfig={{
                  minBufferMs: 1000,
                  maxBufferMs: 6000,
                  bufferForPlaybackMs: 1000,
                  bufferForPlaybackAfterRebufferMs: 2000
                }}
              // fullscreen={true}
              />
            </TouchableOpacity>
            {/* <ContentRight>
              <ContentRightUser>
                <ContentRightUserImage resizeMode="contain" source={{ uri: video.user.image }} />
              </ContentRightUser>
              <ContentRightUserPlus>
                <FontAwesomeIcon icon={faPlus} size={12} color="#FFF" />
              </ContentRightUserPlus>
              <ContentRightHeart>
                <FontAwesomeIcon icon={faHeart} size={28} color="#FFF" />
                <ContentRightText>{video.countLikes > 1000 ? `${video.countLikes}K` : video.countLikes}</ContentRightText>
              </ContentRightHeart>
              <ContentRightComment>
                <FontAwesomeIcon icon={faCommentDots} size={28} color="#FFF" />
                <ContentRightText>{video.countComments > 1000 ? `${video.countComments}K` : video.countLikes}</ContentRightText>
              </ContentRightComment>
              <ContentRightWhatsApp>
                <ContentRightWhatsAppImage source={{ uri: "https://imagepng.org/wp-content/uploads/2017/08/WhatsApp-icone.png" }} />
                <ContentRightText>{video.countWhatsApp > 1000 ? `${video.countWhatsApp}K` : video.countLikes}</ContentRightText>
              </ContentRightWhatsApp>
            </ContentRight> */}
            {/* <ContentLeftBottom>
              <ContentLeftBottomNameUser onPress={() => navigation.navigate("User", {
                user: {
                  image: video.user.image,
                  name: video.user.name,
                  following: video.user.following,
                  followers: video.user.followers,
                  likes: video.user.likes
                }
              })}>
                <ContentLeftBottomNameUserText numberOfLines={1}>{video.user.name}</ContentLeftBottomNameUserText>
              </ContentLeftBottomNameUser>
              <ContentLeftBottomDescription numberOfLines={3}>{video.description}</ContentLeftBottomDescription>
              <ContentLeftBottomMusic numberOfLines={1}>{video.music}</ContentLeftBottomMusic>
            </ContentLeftBottom> */}
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

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Home)
