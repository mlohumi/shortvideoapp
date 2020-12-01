import React, { useState, useEffect } from 'react';
import {
  View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid
} from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBookmark,
  faBars,
  faLock,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';


import BottomTabNavigator from '../../components/BottomTabNavigator';

import {
  Container,
  UserImage,
  UserName,
  UserFollowers,
  UserFollowersText,
  UserFollowersTextNumber,
  UserFollowersTextDesc,
  EditProfile,
  ButtonEditProfile,
  ButtonEditProfileText,
  ButtonFavorites,
  ButtonAddBio,
  ButtonAddBioText,
  Tabs,
  Tab,
} from './styles';

import Home from '../Home/index'

import Posts from '../../components/TabsProfile/Posts';
import Likeds from '../../components/TabsProfile/Likeds';
import Privates from '../../components/TabsProfile/Privates';

//Redux 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile'
import { logout } from '../../actions/auth'

const { width } = Dimensions.get('window');


const Profile = ({
  navigation,
  getCurrentProfile,
  auth: { user, isAuthenticated },
  profile: { profile, loading },
  logout
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'posts' },
    { key: 'likeds', title: 'likeds' },
    { key: 'privates', title: 'privates' },
  ]);


  const renderScene = SceneMap({
    posts: Posts,
    likeds: Likeds,
    privates: Privates,
  });

  useEffect(() => {
    getCurrentProfile()
  }, [])

  if (!isAuthenticated) {
    ToastAndroid.showWithGravity("Logged Out Successfully.", ToastAndroid.SHORT, ToastAndroid.TOP)
    navigation.navigate('Home')
    return null
  } else {
    return (
      <Container>
        <TouchableOpacity style={styles.btnLogin} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
        <ScrollView>
          <UserImage
            resizeMode="contain"
            source={require('../../assets/profileicon.png')}
          />
          <View>
            <UserName>{user && user.name}</UserName>
            <Text style={styles.text}>All features will be available in the next release. Thanks for logging in 😊 </Text>
          </View>
          {/* <UserFollowers>
            <UserFollowersText>
              <UserFollowersTextNumber>0</UserFollowersTextNumber>
              <UserFollowersTextDesc>Following</UserFollowersTextDesc>
            </UserFollowersText>
            <UserFollowersText>
              <UserFollowersTextNumber>9876003</UserFollowersTextNumber>
              <UserFollowersTextDesc>Followers</UserFollowersTextDesc>
            </UserFollowersText>
            <UserFollowersText>
              <UserFollowersTextNumber>197867</UserFollowersTextNumber>
              <UserFollowersTextDesc>Likes</UserFollowersTextDesc>
            </UserFollowersText>
          </UserFollowers> */}
          {/* <EditProfile>
          <ButtonEditProfile>
            <ButtonEditProfileText>Edit profile</ButtonEditProfileText>
          </ButtonEditProfile>
          <ButtonFavorites>
            <FontAwesomeIcon icon={faBookmark} size={20} color="#333" />
          </ButtonFavorites>
        </EditProfile>
        <ButtonAddBio>
          <ButtonAddBioText>Tap to add bio</ButtonAddBioText>
        </ButtonAddBio> */}
          {/* <TabView
            renderTabBar={(props) => (
              <Tabs>
                {props.navigationState.routes.map((tab, key) => (
                  <Tab key={key} onPress={() => props.jumpTo(tab.key)}>
                    {tab.key == 'posts' && (
                      <FontAwesomeIcon
                        icon={faBars}
                        size={20}
                        color={
                          key == props.navigationState.index ? '#333' : '#E5E5E5'
                        }
                      />
                    )}
                    {tab.key == 'likeds' && (
                      <FontAwesomeIcon
                        icon={faHeart}
                        size={20}
                        color={
                          key == props.navigationState.index ? '#333' : '#E5E5E5'
                        }
                      />
                    )}
                    {tab.key == 'privates' && (
                      <FontAwesomeIcon
                        icon={faLock}
                        size={20}
                        color={
                          key == props.navigationState.index ? '#333' : '#E5E5E5'
                        }
                      />
                    )}
                  </Tab>
                ))}
              </Tabs>
            )}
            style={{ width: Dimensions.get('window').width }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width, height: 200 }}
          /> */}
        </ScrollView>

        <BottomTabNavigator
          background="#010101"
          colorIcon="#FFF"
          colorTitle="#FFF"
          navigation={navigation}
        />
      </Container>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, logout })(Profile);

const styles = StyleSheet.create({
  btnLogin: {
    width: width - 180,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 25
  }
})