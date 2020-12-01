import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSearch,
  faInbox,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { Tab, Button, Title, Add } from './styles';
import { ToastAndroid } from 'react-native'

//Redux 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BottomTabNavigator = ({
  navigation,
  background,
  colorTitle,
  colorIcon,
  isAuthenticated
}) => {

  return (
    <Tab background={background}>
      <Button onPress={() => { navigation.navigate('Home') }}>
        <FontAwesomeIcon icon={faHome} size={28} color={colorIcon} />
        <Title style={{ color: colorTitle }}>Home</Title>
      </Button>
      <Button onPress={() => { navigation.navigate('Discover') }}>
        <FontAwesomeIcon icon={faSearch} size={28} color={colorIcon} />
        <Title style={{ color: colorTitle }}>Discover</Title>
      </Button>
      <Button onPress={() => {
        if (isAuthenticated) {
          navigation.navigate('Uploads')
        } else {
          navigation.navigate('Login')
          ToastAndroid.showWithGravity("Please Login to Continue.", ToastAndroid.SHORT, ToastAndroid.TOP)
        }
      }}>
        <Add>
          <FontAwesomeIcon icon={faPlus} size={20} color="#010101" />
        </Add>
      </Button>
      <Button onPress={() => navigation.navigate('Inbox')}>
        <FontAwesomeIcon icon={faInbox} size={28} color={colorIcon} />
        <Title style={{ color: colorTitle }}>Inbox</Title>
      </Button>
      <Button onPress={() => {
        if (isAuthenticated) {
          navigation.navigate('Profile')
        } else {
          navigation.navigate('Login', { title: 'Mukesh' })
          ToastAndroid.showWithGravity("Please Login to Continue.", ToastAndroid.SHORT, ToastAndroid.TOP)
        }
      }
      }>
        <FontAwesomeIcon icon={faUser} size={28} color={colorIcon} />
        <Title style={{ color: colorTitle }}>Me</Title>
      </Button>
    </Tab>
  );
}

BottomTabNavigator.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(BottomTabNavigator);
