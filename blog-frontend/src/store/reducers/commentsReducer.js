import { COMMENTS_FETCH_REQUEST, COMMENTS_FETCH_SUCCESS, COMMENTS_FETCH_FAILURE, COMMENT_CREATE_FAILURE } from "../actions/actionsTypes";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_FETCH_REQUEST:
      return { ...state, loading: true, showForm: false };
    case COMMENTS_FETCH_SUCCESS:
      return { ...state, comments: action.data, loading: false, showForm: false };
    case COMMENTS_FETCH_FAILURE:
      return { ...state, error: action.error.toString(), show: true, loading: false };
    case COMMENT_CREATE_FAILURE:
      return { ...state, error: action.error.toString(), show: true, loading: false };
    default:
      return state;
  }
};

export default reducer;
