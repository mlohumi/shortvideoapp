import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faTimes,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import Login from '../Login'
import axios from 'axios'

import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth'
import Alert from '../../layout/Alert';
import PropTypes from 'prop-types';
import { onChange } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Register = ({ setAlert, register }) => {
  const [showPass, setShowPass] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  const [press, setPress] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = userData
  const [toggle, setToggle] = useState(true)

  const onChangeVal = (inputName, inputValue) => setUserData({
    ...userData,
    [inputName]: inputValue
  })

  const show = () => {
    if (press == false) {
      setShowPass(false), setPress(true);
    } else {
      setShowPass(true), setPress(false);
    }
  };

  const handleRegister = async () => {
    // e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match !', 'danger');
    } else {
      console.log(userData);

      register({ name, email, password })

      //   const newUser = {
      //       name,
      //       email,
      //       password,
      //   }

      //   try {
      //       const config =  {
      //           header: {
      //               'Content-Type': 'application/json'
      //           }
      //       }

      //     //   const body = JSON.stringify(newUser)
      //     const body = newUser
      //       console.log(body.name, "BODY")

      //       const res = await axios.post('http://192.168.1.34:5000/api/users', body, config);
      //       console.log(res.data)
      //   } catch (err) {
      //       console.error(err.response.data, "ABCDEF")
      //   }
    }
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  if (toggle) {
    return (
      <View>
        <Modal isVisible={openModal}>
          <View style={styles.bgContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={modalClose}>
              <FontAwesomeIcon icon={faTimes} size={25} />
            </TouchableOpacity>
            <Alert />
            <View style={styles.inputView}>
              <FontAwesomeIcon icon={faUser} size={25} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Username'}
                value={name}
                onChangeText={(text) => onChangeVal('name', text)}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underLineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputView}>
              <FontAwesomeIcon icon={faEnvelope} size={25} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Email'}
                value={email}
                onChangeText={(text) => onChangeVal('email', text)}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underLineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputView}>
              <FontAwesomeIcon icon={faLock} size={25} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                value={password}
                secureTextEntry={showPass}
                onChangeText={(text) => onChangeVal('password', text)}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underLineColorAndroid="transparent"
              />

              <TouchableOpacity style={styles.btnEye} onPress={show}>
                <FontAwesomeIcon
                  icon={press == false ? faEye : faEyeSlash}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
              <FontAwesomeIcon icon={faLock} size={25} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                value={password2}
                secureTextEntry={showPass}
                onChangeText={(text) => onChangeVal('password2', text)}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underLineColorAndroid="transparent"
              />

              <TouchableOpacity style={styles.btnEye} onPress={show}>
                <FontAwesomeIcon
                  icon={press == false ? faEye : faEyeSlash}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.logText}>Already a member ! Login Now</Text>
            <TouchableOpacity style={styles.btnLogin} onPress={() => setToggle(false)}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  } else {
    // Member login  Form
    return (
      <Login />
    );
  }

};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert, register })
  (Register);

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputView: {
    marginTop: 10,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  btnLogin: {
    width: width - 55,
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
  logText: {
    marginTop: 60,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
  },
});
