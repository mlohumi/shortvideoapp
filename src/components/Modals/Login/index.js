import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import {connect} from 'react-redux';
import {setAlert} from '../../../actions/alert';
import Alert from '../../layout/Alert';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const Login = ({setAlert}) => {
  const [showPass, setShowPass] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  const [press, setPress] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const show = () => {
    if (press == false) {
      setShowPass(false), setPress(true);
    } else {
      setShowPass(true), setPress(false);
    }
  };

  const handleLogin = () => {
    // e.preventDefault();
    if (password == 12345) {
      console.log('success');
    } else {
      setAlert('Password do not match !', 'danger');
    }
  };
  const modalClose = () => {
    setOpenModal(false);
  };
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
              value={username}
              onChangeText={(text) => setUsername(text)}
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
              onChangeText={(text) => setPassword(text)}
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
          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

Login.propTypes = {setAlert: PropTypes.func.isRequired};

export default connect(null, {setAlert})(Login);

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
  closeIcon: {
    position: 'absolute',
    top: 15,
  },
});
