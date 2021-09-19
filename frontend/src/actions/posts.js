import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_POSTS, DELETE_POST, ADD_POST, CREATE, LIKE_POST } from './types';

// GET_POSTS
export const getPosts = () => (dispatch, getState) => {
    axios
        .get("/posts/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE_POST
export const deletePost = (id) => (dispatch, getState) => {
    axios
        .delete(`./posts/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deletePost: "Post Deleted"}));
            dispatch({
                type: DELETE_POST,
                payload: id
            });
        }).catch(err => console.log(err));
};

//ADD_POST
export const addPost = post => (dispatch, getState) => {
    axios
        .post("/posts/", post, tokenConfig(getState))
        .then(res => {
          dispatch(createMessage({ addPost: "Post Added"}));
          dispatch({
              type: ADD_POST,
              payload: res.data
          });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//LIKE_POST
export const likePost = (likeData, id, postData)  => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios
        .patch(`./posts/${id}/`, postData, tokenConfig(getState), config)
        .then(res => {
            dispatch(createMessage({ likePost: "Post Liked"}));
            dispatch({
                type: LIKE_POST,
                payload: res.data
            });
        }).catch(err => console.log(err));
    axios
        .post("/likes/", likeData, tokenConfig(getState))
        .then(res => {
          dispatch(getPosts());
        }).catch(err => console.log(err));
};