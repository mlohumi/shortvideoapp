import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST
} from './types'

// Get Post
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://sanskari-app.herokuapp.com/api/posts')


        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Add Post 
export const addPost = postData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        console.log(postData, "POST DATA")
        const res = await axios.post('https://sanskari-app.herokuapp.com/api/posts', postData, config)
        console.log(res, "post added")

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}