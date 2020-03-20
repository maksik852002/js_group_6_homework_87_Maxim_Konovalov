import { POSTS_FETCH_REQUEST, POSTS_FETCH_SUCCESS, POSTS_FETCH_FAILURE, POST_FETCH_REQUEST, POST_FETCH_SUCCESS, POST_FETCH_FAILURE } from "../actions/actionsTypes";

const initialState = {
  posts: [],
  post: [],
  error: null,
  loading: false,
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_FETCH_REQUEST:
      return { ...state, loading: true };
    case POSTS_FETCH_SUCCESS:
      return { ...state, posts: action.data, loading: false };
    case POSTS_FETCH_FAILURE:
      return {
        ...state,
        error: action.error.toString(),
        show: true,
        loading: false
      };
    case POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case POST_FETCH_SUCCESS:
      return { ...state, post: action.data, loading: false };
    case POST_FETCH_FAILURE:
      return {
        ...state,
        error: action.error.toString(),
        show: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
