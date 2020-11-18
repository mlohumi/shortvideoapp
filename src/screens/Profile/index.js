import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, Modal } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBookmark,
  faBars,
  faLock,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

import BottomTabNavigator from '../../components/BottomTabNavigator';

import Login from '../../components/Modals/Login';

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

import Posts from '../../components/TabsProfile/Posts';
import Likeds from '../../components/TabsProfile/Likeds';
import Privates from '../../components/TabsProfile/Privates';

//Redux 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ navigation, isAuthenticated }) => {
  const [modal, setModal] = useState(true);
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

  return (
    <Container>
      {isAuthenticated ?
        <Text>HI AUTHENTICATED</Text>
        :
        (<ScrollView>
          <UserImage
            resizeMode="contain"
            source={require('../../assets/profile.jpg')}
          />
          <View>
            <UserName>@mukesh</UserName>
          </View>
          <UserFollowers>
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
          </UserFollowers>
          <EditProfile>
            <ButtonEditProfile>
              <ButtonEditProfileText>Edit profile</ButtonEditProfileText>
            </ButtonEditProfile>
            <ButtonFavorites>
              <FontAwesomeIcon icon={faBookmark} size={20} color="#333" />
            </ButtonFavorites>
          </EditProfile>
          <ButtonAddBio>
            <ButtonAddBioText>Tap to add bio</ButtonAddBioText>
          </ButtonAddBio>
          <TabView
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
          />
        </ScrollView>)
      }
      {/* <Login /> */}

      <BottomTabNavigator
        background="#010101"
        colorIcon="#FFF"
        colorTitle="#FFF"
        navigation={navigation}
      />
    </Container>
  );
}

Profile.propTypes = {
  // login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Profile);