import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faUser,
    faLock,
    faEye,
    faEyeSlash,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

import Register from '../Register';

import BottomTabNavigator from '../../components/BottomTabNavigator'

import { connect } from 'react-redux';
import Alert from '../../components/layout/Alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

const { width } = Dimensions.get('window');

const Login = ({ navigation, login, isAuthenticated }) => {
    const [showPass, setShowPass] = useState(true);
    const [press, setPress] = useState(false);

    const [userData, setuserData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userData

    const onChangeVal = (inputName, inputValue) => setuserData({
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

    const handleLogin = () => {
        // e.preventDefault();
        login(email, password)
    };

    return (
        <View style={styles.bgContainer}>
            <Alert />
            <View style={styles.inputView}>
                <FontAwesomeIcon
                    icon={faUser}
                    size={25}
                    style={styles.inputIcon}
                />
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
                <FontAwesomeIcon
                    icon={faLock}
                    size={25}
                    style={styles.inputIcon}
                />
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
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.regText}>
                New Member! Please register to continue
            </Text>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <BottomTabNavigator
                background="transparent"
                colorIcon="#FFF"
                colorTitle="#FFF"
                navigation={navigation}
            />
        </View>

    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

const styles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#8c8c8c"
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
    regText: {
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
