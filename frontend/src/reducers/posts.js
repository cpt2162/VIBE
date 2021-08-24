import { GET_POSTS, DELETE_POST, ADD_POST, LIKE_POST } from '../actions/types.js';

const initialState = {
    posts: []
}

export default function(state = initialState, action) {
    switch(action.type) {
      case GET_POSTS:
          return {
              ...state,
              posts: action.payload
          };
      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter(post => post.id !== action.payload)
         };
       case ADD_POST:
         return {
            ...state,
            posts: [action.payload, ...state.posts]
         };
       case LIKE_POST:
        return {
            ...state,
        };
      default:
        return state;
    }
}