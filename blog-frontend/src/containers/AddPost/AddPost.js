import React, { useEffect } from "react";
import PostForm from "../../components/PostForm/PostForm";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/actions/postsActions";
import { push } from "connected-react-router";

const AddPost = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(push('/login'));
    }
  }, [user, dispatch]);
  return (
    <>
        <div className="border rounded mt-4 p-4">
          <h2 className="mb-4">Add New Post</h2>
          <PostForm onSubmit={(data) => dispatch(createPost(data))} />
        </div>
    </>
  );
};

export default AddPost;
