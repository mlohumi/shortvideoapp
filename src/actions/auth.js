import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setAlert } from '../actions/alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'


//Load User
export const loadUser = () => async dispatch => {
    let tok = await AsyncStorage.getItem('token')
    if (tok) {
        setAuthToken(tok)
    }

    try {
        const res = await axios.get('https://sanskari-app.herokuapp.com/api/auth'); //change to absolute path - use default proxy
        console.log(res.data, "RESPONSE DATA")

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, password, email })

    try {
        const res = await axios.post('https://sanskari-app.herokuapp.com/api/users', body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {

        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('https://sanskari-app.herokuapp.com/api/auth', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {

        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//Logout User / Clear Profile

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
} 