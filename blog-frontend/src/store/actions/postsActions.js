import { POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAILURE, POSTS_FETCH_REQUEST, POSTS_FETCH_SUCCESS, POSTS_FETCH_FAILURE, POST_FETCH_REQUEST, POST_FETCH_SUCCESS, POST_FETCH_FAILURE } from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from "connected-react-router";

export const postsFetchRequest = () => ({ type: POSTS_FETCH_REQUEST });
export const postsFetchSuccess = data => ({ type: POSTS_FETCH_SUCCESS, data });
export const postsFetchFailure = error => ({ type: POSTS_FETCH_FAILURE, error });

export const postFetchRequest = () => ({type: POST_FETCH_REQUEST});
export const postFetchSuccess = data => ({type: POST_FETCH_SUCCESS, data});
export const postFetchFailure = error => ({type: POST_FETCH_FAILURE, error});

export const postCreateRequest = () => ({type: POST_CREATE_REQUEST});
export const postCreateSuccess = () => ({type: POST_CREATE_SUCCESS});
export const postCreateFailure = error => ({type: POST_CREATE_FAILURE, error});

// export const newsDeleteFailure = error => ({
//   type: NEWS_DELETE_FAILURE,
//   error
// });

export const fetchPosts = () => {
  return async dispatch => {
    try {
      dispatch(postsFetchRequest());
      const response = await axios.get("/posts");
      dispatch(postsFetchSuccess(response.data));
    } catch (e) {
      dispatch(postsFetchFailure(e));
    }
  };
};

export const fetchPost = id => {
  return async dispatch => {
    try {
      dispatch(postFetchRequest());
      const response = await axios.get(`/posts/${id}`);
      dispatch(postFetchSuccess(response.data));
    } catch (e) {
      dispatch(postFetchFailure(e));
    }
  };
};

export const createPost = data => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = {"Authorization": "Token " + token};
      dispatch(postCreateRequest());
      await axios.post("/posts", data, {headers});
      dispatch(postCreateSuccess());
      dispatch(push("/"));
    } catch (e) {
      dispatch(postCreateFailure(e));
    }
  };
};


// export const deleteNews = id => {
//   return async dispatch => {
//     try {
//       await axios.delete(`/news/${id}`);
//       dispatch(fetchNews());
//     } catch (e) {
//       dispatch(newsDeleteFailure(e));
//     }
//   };
// };
