import { COMMENTS_FETCH_REQUEST, COMMENTS_FETCH_SUCCESS, COMMENTS_FETCH_FAILURE, COMMENT_CREATE_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";

export const commentsFetchRequest = () => ({ type: COMMENTS_FETCH_REQUEST });
export const commentsFetchSuccess = data => ({ type: COMMENTS_FETCH_SUCCESS, data });
export const commentsFetchFailure = error => ({ type: COMMENTS_FETCH_FAILURE, error });

export const commentCreateFailure = error => ({ type: COMMENT_CREATE_FAILURE, error });

export const fetchComments = query => {
  return async dispatch => {
    try {
      dispatch(commentsFetchRequest);
      const response = await axios.get("/comments/" + query);
      dispatch(commentsFetchSuccess(response.data));
    } catch (e) {
      dispatch(commentsFetchFailure(e));
    }
  };
};

export const createComment = (data, query) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = {"Authorization": "Token " + token};
      await axios.post("/comments/", data, {headers});
      dispatch(fetchComments(query));
    } catch (e) {
      dispatch(commentCreateFailure(e));
    }
  };
};
