import React from 'react';
import {
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserPlus,
  faEllipsisH,
  faChevronLeft,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import Home from '../screens/Home';
import Uploads from '../screens/Uploads';
// import Discover from '../screens/Discover';
// import Profile from '../screens/Profile';
// import Inbox from '../screens/Inbox';

const Stack = createStackNavigator();

StatusBar.setHidden(true);

const Routes = () => (
  <NavigationContainer
    onStateChange={(state) =>
      state.index == 0 ? StatusBar.setHidden(true) : StatusBar.setHidden(false)
    }>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Uploads"
        component={Uploads}
        options={{
          header: () => null,
        }}
      />
      {/* <Stack.Screen name="Discover" component={Discover} /> */}
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => (
            <Text
              numberOfLines={1}
              style={{maxWidth: 150, fontWeight: 'bold', fontSize: 18}}>
              Mukesh Lohumi
            </Text>
          ),
          headerLeft: () => (
            <FontAwesomeIcon
              style={{marginLeft: 10}}
              icon={faUserPlus}
              size={25}
              color="#010101"
            />
          ),
          headerRight: () => (
            <FontAwesomeIcon
              style={{marginRight: 10}}
              icon={faEllipsisH}
              size={25}
              color="#010101"
            />
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerTitle: () => (
            <Text
              numberOfLines={1}
              style={{maxWidth: 150, fontWeight: 'bold', fontSize: 18}}>
              All activity
            </Text>
          ),
          headerLeft: () => null,
          headerRight: () => (
            <FontAwesomeIcon
              style={{marginRight: 10}}
              icon={faPaperPlane}
              size={25}
              color="#010101"
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
